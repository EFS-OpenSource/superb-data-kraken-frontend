import { uploadFileToS3, getDownloadLinkS3 } from '@services/api/s3Service';

test('uploadFileToS3 function', () => {
  uploadFileToS3(
    [],
    {
      bucketName: 'bucketName',
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey',
      sessionToken: 'sessionToken',
      endpoint: 'endpoint',
    },
    () => null,
    'foldername'
  );
});
test('getDownloadLinkS3 function', () => {
  getDownloadLinkS3({
    fileNameWithLocation: 'filenameWithLocation',
    s3Credentials: {
      bucketName: 'bucketName',
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey',
      sessionToken: 'sessionToken',
      endpoint: 'endpoint',
    },
  });
});
