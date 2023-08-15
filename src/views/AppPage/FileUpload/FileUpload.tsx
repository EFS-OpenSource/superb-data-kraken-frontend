import React, { useState, useEffect, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { format } from 'date-fns';
import { Button, Container, ProgressBar } from 'react-bootstrap';
import {
  // CustomTable,
  FileFolderInput,
  Icon,
} from '@components/index';
import { ErrorToast, SuccessToast } from '@notifications/index';
import {
  postFactory,
  S3_CLIENT_ID,
  S3_GRANT_TYPE,
  uploadFileToBlob,
  // uploadFileToS3,
  getSasTokenUpload,
  accessmanagerCommit,
  getS3JwtToken,
  getS3AccessKey,
} from '@services/index';
import { formatFileSize } from '@utils/index';
import {
  Organization,
  Space,
  AxiosOptions,
  CreateSASTokenData,
  FilesTypeForTable,
  S3AccessKeyResult,
} from '@customTypes/index';
import { FaTrash } from 'react-icons/fa';
import { BsFolder2 } from 'react-icons/bs';
import { ImFilesEmpty } from 'react-icons/im';
// import { DefaultColumnsUploadTable } from '../../assets/configs/upload/configInitialColums';

interface CustomTagProps {
  orgData: Organization;
  spaceData: Space;
}

const FileUpload: React.FC<CustomTagProps> = ({ orgData, spaceData }) => {
  const { formatMessage } = useIntl();
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleDragFile = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const filterDuplicates = (newFiles: any[]) => {
    const validFiles = newFiles.filter(
      (newFile) =>
        !uploadFiles.find((existing) => existing.name === newFile.name),
    );
    return validFiles;
  };

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.files) {
      const newFiles = Array.from(e.currentTarget.files);

      const validFiles = filterDuplicates(newFiles);

      if (validFiles.length) {
        validFiles.map((file) =>
          setUploadFiles((existing) => [...existing, file]),
        );
      }
    }
  };

  const handleRemoveFile = useCallback(
    (id: number) => {
      const newFiles = Array.from(uploadFiles);
      newFiles.splice(id, 1);
      setUploadFiles(newFiles);
    },
    [uploadFiles],
  );

  const resetUI: () => void = () => {
    setUploading(false);
    setUploadProgress(0);
    setUploadFiles([]);
  };

  const readFileAsText = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target === null) {
          reject(new Error('Unexpected null within FileReader event.target'));
          return;
        }
        resolve(event.target.result as string);
      };
      reader.onerror = (error) => reject(error);

      reader.readAsText(file);
    });

  const metaValidate = async (): Promise<boolean> => {
    const metaFile = uploadFiles.find((file) => file.name === 'meta.json');

    if (!metaFile) {
      ErrorToast('ErrorToast.no-metajson');
      resetUI();
      return false;
    }
    const jsonContent = await readFileAsText(metaFile);

    if (typeof jsonContent !== 'string') {
      ErrorToast('ErrorToast.metajson-invalid');
      resetUI();
      return false;
    }

    try {
      const payload = JSON.parse(jsonContent);
      const baseURL = process.env.VITE_SDK_BACKEND_URL;
      const urlOptions: AxiosOptions = {
        url: process.env.VITE_SDK_BACKEND_URL as string,
        path: '/metadata',
        version: '/v1.0',
      };
      const validateJsonPost = postFactory<string, any>(urlOptions, baseURL);
      console.log(jsonContent);
      const validateJson = await validateJsonPost('validateJson', payload);

      if (validateJson.status !== 200) {
        ErrorToast('ErrorToast.metajson-invalid');
        resetUI();
        return false;
      }

      return true;
    } catch (error: any) {
      console.log('1', error);
      ErrorToast('ErrorToast.title-upload', error);
      return false;
    }
  };

  const handleUploadResponse = async (
    uploadResponse: string[],
    data: CreateSASTokenData,
  ) => {
    setUploadProgress(100);
    // Only run commit on upload success
    // map uploadResponse
    await Promise.all(
      uploadResponse.map((ur) => {
        if (ur) {
          return accessmanagerCommit({
            organization: data.organization,
            space: data.space,
            rootDir: ur,
          });
        }
        return '';
      }),
    )
      .then((commitResponse) => {
        console.log('0', commitResponse);
        SuccessToast(
          'SuccessToast.title-upload',
          `${formatMessage({
            id: 'SuccessToast.upload-files',
          })}: ${uploadFiles.length}`,
          `${formatMessage({
            id: 'SuccessToast.upload-target',
          })}: ${data.space}`,
        );
        resetUI();
      })
      .catch((error) => {
        console.log('1', error);
        ErrorToast('ErrorToast.title-upload', error);
        resetUI();
      })
      .catch((error) => {
        console.log('2', error);
        ErrorToast('ErrorToast.title-upload', '403', 'Unauthorized');
        resetUI();
      });
  };

  let s3Access: S3AccessKeyResult;
  const handleOnSubmit = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    const datestring = format(new Date(), 'yyyyMMddHHmmss');
    const data: CreateSASTokenData = {
      organization: orgData.name,
      space: spaceData.name,
    };
    if (!spaceData.metadataGenerate) {
      const metaJsonIsValid = await metaValidate();
      if (!metaJsonIsValid) {
        resetUI();
        return;
      }
    }
    if (!process.env.VITE_S3_STORAGE) {
      let sas = '';

      await getSasTokenUpload(data).then((response) => {
        sas = response.data;
      });

      setUploading(true);

      await uploadFileToBlob(
        uploadFiles,
        data.organization,
        sas,
        setUploadProgress,
        datestring,
      ).then((uploadResponse: string[]) =>
        handleUploadResponse(uploadResponse, data),
      );
    } else {
      let s3JwtToken = '';

      // TODO: Use Credentials of acual usecase (?)
      const S3JwtTokenData = {
        grant_type: S3_GRANT_TYPE,
        client_id: S3_CLIENT_ID,
        username: orgData.name,
        password: spaceData.name,
      };

      await getS3JwtToken(S3JwtTokenData).then((response) => {
        s3JwtToken = response.data.access_token;
      });

      await getS3AccessKey(s3JwtToken).then((response) => {
        s3Access = response.data;
      });

      const s3Credentials = {
        bucketName: process.env.VITE_S3_BUCKET as string,
        accessKeyId: s3Access.accessKeyId,
        secretAccessKey: s3Access.secretAccessKey,
        sessionToken: s3Access.sessionToken,
        endpoint: process.env.VITE_S3_STORAGE as string,
      };

      setUploading(true);

      // await uploadFileToS3(
      //   uploadFiles,
      //   s3Credentials,
      //   setUploadProgress,
      //   datestring,
      // ).then((uploadResponse: string[]) =>
      //   handleUploadResponse(uploadResponse, data),
      // );
    }
  };

  const [filesForTable, setFilesForTable] = useState<FilesTypeForTable[]>([]);

  useEffect(() => {
    const filesTable = uploadFiles.map((file) => {
      let fileName = file.name;
      if (file.webkitRelativePath) fileName = file.webkitRelativePath;
      return {
        ...file,
        size: file.size,
        type: file.type,
        name: fileName,
      };
    });
    const files: FilesTypeForTable[] = [];
    filesTable.forEach((file, i) => {
      files.push({
        count: i + 1,
        name: `...${file.name.substring(
          file.name.length - 60,
          file.name.length,
        )}`,
        type: file.type,
        size: formatFileSize(file.size, 2),
        action: (
          <Icon
            icon={FaTrash}
            className="text-primary"
            type="button"
            style={{
              lineHeight: 1.5,
            }}
            onClick={() => handleRemoveFile(i)}
          />
        ),
      });
    });
    setFilesForTable(files);
  }, [handleRemoveFile, uploadFiles]);

  return (
    <section>
      <Container fluid className="w-100">
        {uploading ? (
          <ProgressBar
            className="m-8"
            animated
            striped
            now={uploadProgress}
            label={`${uploadProgress}%`}
          />
        ) : (
          <div className="d-flex flex-col justify-content-center mt-6 mb-4 gap-4">
            <FileFolderInput
              htmlFor="folder-upload"
              containerId="folder-drop"
              ariaLabel="folder-upload"
              inputId="folder-upload"
              webkitDirectory=""
              icon={BsFolder2}
              textId="FileUpload.instruction-folder"
              onDrop={handleDropFile}
              onDragOver={handleDragFile}
              onChange={handleSelectFile}
            />
            <FileFolderInput
              htmlFor="file-upload"
              containerId="file-drop"
              ariaLabel="file-upload"
              isMultiple
              inputId="file-upload"
              icon={ImFilesEmpty}
              textId="FileUpload.instruction-files"
              onDrop={handleDropFile}
              onDragOver={handleDragFile}
              onChange={handleSelectFile}
            />
          </div>
        )}
      </Container>

      {!uploading && (
        <>
          <div className="w-100 d-flex justify-content-center">
            <Button
              aria-label="delete-button"
              variant="primary"
              className="ms-2"
              onClick={resetUI}
              disabled={!uploadFiles.length}
            >
              {formatMessage({
                id: 'FileUpload.delete-all',
              })}
            </Button>
            <Button
              aria-label="upload-button"
              role="button"
              variant="primary"
              className="ms-4"
              onClick={handleOnSubmit}
              disabled={!uploadFiles.length}
            >
              {formatMessage({
                id: 'FileUpload.upload',
              })}
            </Button>
          </div>
          {/* Placeholder until CustomTable is available */}
          <div className="w-75 d-flex m-auto my-4">
            {JSON.stringify(filesForTable)}
          </div>
          {/* <section className="w-100 mt-4">
            <div className="w-80 m-auto">
              {uploadFiles.length > 0 && (
                <CustomTable
                  columns={DefaultColumnsUploadTable()}
                  data={filesForTable}
                />
              )}
            </div>
          </section> */}
        </>
      )}
    </section>
  );
};

export default FileUpload;
