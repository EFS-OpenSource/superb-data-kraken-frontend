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

import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { Response, ResponseError } from '@customTypes/index';

const defaultError = (error: any): ResponseError => ({
  message: error,
  ok: false,
});

const createBlobInContainer = async (
  containerClient: ContainerClient,
  file: File,
  filesize: number,
  uploadsetter: React.Dispatch<React.SetStateAction<number>>,
  foldername: string,
): Promise<void> => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(
    foldername.concat('/', file.name),
  );

  await blobClient.uploadData(file, {
    blobHTTPHeaders: { blobContentType: file.type },
    onProgress: (ev) => {
      uploadsetter(parseFloat(((ev.loadedBytes / filesize) * 100).toFixed(2)));
    },
  });
};

export const uploadFileToBlob = async (
  file: File[] | null,
  storageAccountName: string,
  sasToken: string,
  uploadsetter: React.Dispatch<React.SetStateAction<number>>,
  foldername: string,
): Promise<string[]> => {
  if (!file) return [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,
  );

  // get Container - full public read access
  const containerClient: ContainerClient =
    blobService.getContainerClient('loadingzone');

  const pathArray: string[] = [];

  await Promise.all(
    file.map((singleFile) => {
      let path = '';
      let pushPath = foldername;
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

      return createBlobInContainer(
        containerClient,
        singleFile,
        singleFile.size,
        uploadsetter,
        path,
      );
    }),
  );
  const uniquePathArray = Array.from(new Set(pathArray));

  return uniquePathArray;
};

export const getDownloadLink = async ({
  organization,
  space,
  fileNameWithLocation,
  sasToken,
}: {
  organization: string;
  space: string;
  fileNameWithLocation: string;
  sasToken: string;
}): Promise<Response<string | ArrayBuffer | null> | ResponseError> => {
  const blobServiceClient = new BlobServiceClient(
    `https://${organization}.blob.core.windows.net?${sasToken}`,
  );

  try {
    const containerClient = await blobServiceClient.getContainerClient(space);
    const blockBlobClient =
      containerClient.getBlockBlobClient(fileNameWithLocation);

    const blobClientProperties = await await blockBlobClient.getProperties();
    if (
      blobClientProperties._response &&
      blobClientProperties.contentType === 'application/json'
    ) {
      const blobToString = async (
        blob: Blob | undefined,
      ): Promise<string | ArrayBuffer | null> => {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
          fileReader.onloadend = (ev) => {
            // better use try catch?
            if (ev.target) {
              resolve(ev.target.result);
            }
          };
          fileReader.onerror = reject;
          // better use try catch?
          if (blob) {
            fileReader.readAsText(blob);
          }
        });
      };

      const downloadBlockBlobResponse = await blockBlobClient.download(0);
      const downloaded = await blobToString(
        await downloadBlockBlobResponse.blobBody,
      );
      return {
        data: downloaded,
        status: blobClientProperties._response.status,
        statusText: 'application/json',
        ok:
          blobClientProperties._response.status >= 200 &&
          blobClientProperties._response.status < 300,
      };
    }
    if (
      blobClientProperties._response &&
      blobClientProperties.contentType !== 'application/json'
    ) {
      return {
        data: blockBlobClient.url,
        status: blobClientProperties._response.status,
        statusText: 'application/octet-stream',
        ok:
          blobClientProperties._response.status >= 200 &&
          blobClientProperties._response.status < 300,
      };
    }
    return defaultError(Error);
  } catch (Error) {
    return defaultError(Error);
  }
};
