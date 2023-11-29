import { uploadFileToBlob, getDownloadLink } from '@services/api/blobService';

test('uploadFileToBlob function', () => {
  uploadFileToBlob([], 'myAccount', 'sada', () => null, 'my folder');
});

test('getDownloadLink function', () => {
  getDownloadLink({
    organization: 'test org',
    space: 'test space',
    fileNameWithLocation: ' test file',
    sasToken: 'adfwf',
  });
});
