import { postFactory } from '@services/index';
import {
  S3JwtTokenData,
  S3JwtTokenResult,
  S3AccessKeyResult,
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

// const getSasTokenUploadPost = postFactory<CreateSASTokenData, string>(
//   accessManagerOptions,
//   baseURL,
// );

// export const getSasTokenUpload = (
//   payload: CreateSASTokenData,
// ): Promise<Response<string> | ResponseError> =>
//   getSasTokenUploadPost('accessmanager/upload', payload, {
//     queryParams: {
//       space: payload.space,
//       organization: payload.organization,
//     },
//   });

// /* Get sas Token for download */

// const getSasTokenDownloadPost = postFactory<CreateSASTokenData, string>(
//   accessManagerOptions,
//   baseURL,
// );
// export const getSasTokenDownload = (
//   payload: CreateSASTokenData,
// ): Promise<Response<string> | ResponseError> =>
//   getSasTokenDownloadPost('accessmanager/read', payload, {
//     queryParams: {
//       space: payload.space,
//       organization: payload.organization,
//     },
//   });

/* Get S3 Tokens */

// Coming from window/html env now? How to solve?
const s3BaseUrl = process.env.NX_S3_BACKEND_URL;
const s3StorageUrl = process.env.NX_S3_STORAGE;

const s3JwtOptions: AxiosOptions = {
  url: s3BaseUrl ?? '',
  path: '/auth/realms/sdk/protocol/openid-connect/token',
  version: '/v2.0',
};

const s3AccessKeyOptions: AxiosOptions = {
  url: s3StorageUrl ?? '',
  path: '',
  version: '/v2.0',
};

/* Get s3 jwt token */

const getS3JwtTokenPost = postFactory<S3JwtTokenData, S3JwtTokenResult>(
  s3JwtOptions,
  s3BaseUrl,
);

export const getS3JwtToken = (
  payload: S3JwtTokenData,
): Promise<Response<S3JwtTokenResult> | ResponseError> =>
  getS3JwtTokenPost('auth/realms/sdk/protocol/openid-connect/token', payload, {
    queryParams: {
      grant_type: payload.grant_type,
      client_id: payload.client_id,
      username: payload.username,
      password: payload.password,
    },
  });

/* Get s3 access key */

const getS3AccessKeyPost = postFactory<string, S3AccessKeyResult>(
  s3AccessKeyOptions,
  s3StorageUrl,
);

export const getS3AccessKey = (
  access_token: string,
): Promise<Response<S3AccessKeyResult> | ResponseError> =>
  getS3AccessKeyPost('', access_token, {
    queryParams: {
      Action: 'AssumeRoleWithWebIdentity',
      Version: '2011-06-15',
      WebIdentityToken: access_token,
      DurationSeconds: '86000',
    },
  });

/* Commit File Transaction */

// const accessmanagerCommitPost = postFactory<CommitData, SasTokenResult>(
//   accessManagerOptions,
//   baseURL,
// );
// export const accessmanagerCommit = (
//   payload: CommitData,
// ): Promise<Response<SasTokenResult> | ResponseError> =>
//   accessmanagerCommitPost('accessmanager/commit', payload, {
//     queryParams: {
//       space: payload.space,
//       organization: payload.organization,
//       rootDir: payload.rootDir,
//     },
//   });
