import { postFactory } from '@services/index';
import {
  CreateSASTokenData,
  SasTokenResult,
  CommitData,
  Response,
  AxiosOptions,
  ResponseError,
} from '@customTypes/index';

const baseURL = process.env.VITE_SDK_BACKEND_URL;

const accessManagerOptions: AxiosOptions = {
  url: baseURL ?? '',
  path: '/accessmanager/api',
  version: '/v2.0',
};

/* Get sas Token for upload */

const getSasTokenUploadPost = postFactory<CreateSASTokenData, string>(
  accessManagerOptions,
  baseURL,
);
export const getSasTokenUpload = (
  payload: CreateSASTokenData,
): Promise<Response<string> | ResponseError> =>
  getSasTokenUploadPost('accessmanager/upload', payload, {
    queryParams: {
      space: payload.space,
      organization: payload.organization,
    },
  });

/* Get sas Token for download */

const getSasTokenDownloadPost = postFactory<CreateSASTokenData, string>(
  accessManagerOptions,
  baseURL,
);
export const getSasTokenDownload = (
  payload: CreateSASTokenData,
): Promise<Response<string> | ResponseError> =>
  getSasTokenDownloadPost('accessmanager/read', payload, {
    queryParams: {
      space: payload.space,
      organization: payload.organization,
    },
  });

/* Commit File Transaction */

const accessmanagerCommitPost = postFactory<CommitData, SasTokenResult>(
  accessManagerOptions,
  baseURL,
);
export const accessmanagerCommit = (
  payload: CommitData,
): Promise<Response<SasTokenResult> | ResponseError> =>
  accessmanagerCommitPost('accessmanager/commit', payload, {
    queryParams: {
      space: payload.space,
      organization: payload.organization,
      rootDir: payload.rootDir,
    },
  });
