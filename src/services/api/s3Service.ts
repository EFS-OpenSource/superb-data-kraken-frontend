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

import { Upload } from '@aws-sdk/lib-storage';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ResponseError } from '@customTypes/index';

interface Response<T> {
  status?: number;
  statusText?: string;
  data: T;
  ok?: boolean;
}

const defaultError = (error: any): ResponseError => ({
  message: error,
  ok: false,
});

export const uploadFileToS3 = async (
  file: File[] | null,
  s3Credentials: {
    bucketName: string;
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    endpoint: string;
  },
  uploadsetter: React.Dispatch<React.SetStateAction<number>>,
  foldername: string,
): Promise<string[]> => {
  if (!file) return [];
  const pathArray: string[] = [];
  await Promise.all(
    file.map((singleFile) => {
      let path = '';
      let pushPath = foldername;
      try {
        const relativePath = singleFile.webkitRelativePath;
        if (relativePath) {
          const foldernameWithPath = `${relativePath}`;
          path = foldernameWithPath.substring(
            0,
            foldernameWithPath.lastIndexOf('/'),
          );
          pushPath = path.substring(0, relativePath.indexOf('/'));
        } else {
          path = foldername;
        }
        pathArray.push(pushPath);

        const target = {
          Bucket: s3Credentials.bucketName,
          Key: `${path}/${singleFile.name}`,
          Body: singleFile,
        };

        const parallelUploads3 = new Upload({
          client: new S3Client({
            credentials: {
              accessKeyId: s3Credentials.accessKeyId,
              secretAccessKey: s3Credentials.secretAccessKey,
              sessionToken: s3Credentials.sessionToken,
            },
            endpoint: s3Credentials.endpoint,
          }),
          params: target,

          queueSize: 4, // optional concurrency configuration
          partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
          leavePartsOnError: false, // optional manually handle dropped parts
        });

        parallelUploads3.on('httpUploadProgress', (progress) => {
          if (progress.loaded && progress.total)
            uploadsetter(
              parseFloat(((progress.loaded / progress.total) * 100).toFixed(2)),
            );
        });

        parallelUploads3.done();
      } catch (e) {
        return defaultError(e);
      }
      return 'done';
    }),
  );

  const uniquePathArray = Array.from(new Set(pathArray));

  return uniquePathArray;
};

export const getDownloadLinkS3 = async ({
  fileNameWithLocation,
  s3Credentials,
}: {
  fileNameWithLocation: string;
  s3Credentials: {
    bucketName: string;
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    endpoint: string;
  };
}): Promise<Response<string | ArrayBuffer | null> | ResponseError> => {
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: s3Credentials.accessKeyId,
      secretAccessKey: s3Credentials.secretAccessKey,
      sessionToken: s3Credentials.sessionToken,
    },
    endpoint: s3Credentials.endpoint,
  });

  const params = {
    Bucket: s3Credentials.bucketName,
    Key: fileNameWithLocation,
  };

  try {
    const getCommand = new GetObjectCommand(params);
    const getResponse = await s3Client.send(getCommand);
    const sizeInMb = getResponse.ContentLength
      ? getResponse.ContentLength / (1024 * 1024)
      : 0;
    if (
      getResponse &&
      getResponse.ContentType === 'application/json' &&
      sizeInMb <= 100
    ) {
      const downloaded = await new Response(
        getResponse.Body as ReadableStream,
      ).text();

      return {
        data: downloaded,
        status: getResponse.$metadata.httpStatusCode as number,
        statusText: 'application/json',
        ok: true,
      };
    }

    if (
      getResponse &&
      (getResponse.ContentType !== 'application/json' || sizeInMb > 100)
    ) {
      const url = await getSignedUrl(s3Client, new GetObjectCommand(params));

      return {
        data: url,
        status: getResponse.$metadata.httpStatusCode as number,
        statusText: 'application/json',
        ok: true,
      };
    }
    return defaultError(Error);
  } catch (Error) {
    return defaultError(Error);
  }
};
