/*
Copyright (C) 2023 e:fs TechHub GmbH (sdk@efs-techhub.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

import { createColumnHelper } from '@tanstack/react-table';
import { Icon, CustomTable } from '@components/index';
import { format } from 'date-fns';
import download from 'downloadjs';
import { useMemo, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';
import { useIntl } from 'react-intl';
import {
  getDownloadLink,
  getDownloadLinkS3,
  S3_CLIENT_ID,
  S3_GRANT_TYPE,
  getSasTokenDownload,
  getS3JwtToken,
  getS3AccessKey,
} from '@services/index';
import { ErrorToast } from '@notifications/index';
import {
  MeasurementIndex,
  MeasurementInfoOverlayColumns,
  CreateSASTokenData,
  S3AccessKeyResult,
} from '@customTypes/index';
import ProjectInfo from './ProjectInfo';

let s3Access: S3AccessKeyResult;

export interface MeasurementInfoOverlayProps {
  data: MeasurementIndex;
  onOverlayToggler: (overlayToggler: MeasurementIndex | undefined) => void;
}

const columnHelper = createColumnHelper<MeasurementInfoOverlayColumns>();

function MeasurementInfoOverlay({
  data,
  onOverlayToggler,
}: MeasurementInfoOverlayProps): JSX.Element {
  const { formatMessage } = useIntl();

  const columnData = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: formatMessage({
          id: 'ConfigInitialColumns.DefaultColumnsData.name',
        }),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('dateCreated', {
        header: formatMessage({
          id: 'ConfigInitialColumns.DefaultColumnsData.createdAt',
        }),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('size', {
        header: formatMessage({
          id: 'ConfigInitialColumns.DefaultColumnsData.size',
        }),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('download', {
        header: formatMessage({
          id: 'ConfigInitialColumns.DefaultColumnsData.download',
        }),
        cell: (info) => info.getValue(),
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    [],
  );
  // const columnData = DefaultColumnsData().map((defaultColumnData) => ({
  //   Header: defaultColumnData.label as keyof MassData,
  //   accessor: defaultColumnData.value as keyof MassData,
  // }));

  const handleFileDownload = ({
    organization,
    space,
    fileName,
    fileNameWithLocation,
  }: {
    organization: string;
    space: string;
    fileName: string;
    fileNameWithLocation: string;
  }): void => {
    if (!process.env.VITE_S3_STORAGE) {
      const sasData: CreateSASTokenData = {
        organization,
        space,
      };

      getSasTokenDownload(sasData).then((responseSas) => {
        if (responseSas.ok) {
          const sasToken = responseSas.data;
          getDownloadLink({
            organization,
            space,
            fileNameWithLocation,
            sasToken,
          }).then((response) => {
            if (response.data) {
              if (response.statusText !== 'application/json') {
                (window as Window).open(response.data, 'hiddenIframe');
              } else {
                download(response.data, `${fileName}`);
              }
            } else {
              ErrorToast(
                'ErrorToast.title-download',
                response.status,
                response.statusText,
              );
            }
          });
        } else {
          ErrorToast(
            'ErrorToast.title-download',
            responseSas.status,
            responseSas.statusText,
          );
        }
      });
    } else {
      let s3JwtToken = '';

      const s3JwtTokenData = {
        grant_type: S3_GRANT_TYPE,
        client_id: S3_CLIENT_ID,
        username: organization,
        password: space,
      };

      getS3JwtToken(s3JwtTokenData).then((response) => {
        s3JwtToken = response.data.access_token;
      });

      getS3AccessKey(s3JwtToken).then((response) => {
        s3Access = response.data;
      });

      const bucketName = process.env.VITE_S3_BUCKET || '';
      const endpoint = process.env.VITE_S3_STORAGE || '';

      const s3Credentials = {
        bucketName,
        accessKeyId: s3Access.accessKeyId,
        secretAccessKey: s3Access.secretAccessKey,
        sessionToken: s3Access.sessionToken,
        endpoint,
      };

      getDownloadLinkS3({
        fileNameWithLocation,
        s3Credentials,
      }).then((response) => {
        if (response.data) {
          if (response.statusText !== 'application/json') {
            (window as Window).open(response.data, 'hiddenIframe');
          } else {
            download(response.data, `${fileName}`);
          }
        } else {
          ErrorToast(
            'ErrorToast.title-download',
            response.status,
            response.statusText,
          );
        }
      });
    }
  };

  const convertedMassdata = data.massdata.map((object) => ({
    dateCreated: format(new Date(object.dateCreated), 'dd-MM-yyyy'),
    location: object.location,
    name: object.name,
    nameWithLocation: object.location,
    size: parseFloat((object.size / 1024 ** 2).toFixed(2)),
    download: (
      <>
        <iframe className="d-none" title="some" name="hiddenIframe" />
        <Icon
          icon={BsDownload}
          type="button"
          onClick={() =>
            handleFileDownload({
              organization: data.organization,
              space: data.space,
              fileName: object.name,
              fileNameWithLocation: object.location,
            })
          }
          size={20}
        />
      </>
    ),
  }));

  const rowCountValues = [10, 25, 50, 100];
  const [rowCount, setRowCount] = useState<number>(rowCountValues[1]);

  return (
    <Container fluid className="p-0 m-0">
      <ProjectInfo data={data} />
      <CustomTable
        data={convertedMassdata}
        columns={columnData}
        tableName="MeasurementIndexOverlay"
        withDropdownColumnSelect={false}
      />

      <Button
        className="mt-7 mb-10"
        onClick={() => onOverlayToggler(undefined)}
      >
        {formatMessage({
          id: 'MeasuremenentInfoOverlay.back-button',
        })}
      </Button>
    </Container>
  );
}

export default MeasurementInfoOverlay;
