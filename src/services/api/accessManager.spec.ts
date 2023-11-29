import {
  getSasTokenUpload,
  accessmanagerCommit,
} from '@services/api/accessManager';

test('getSasTokenUpload function', () => {
  getSasTokenUpload({ organization: 'org', space: 'space' });
});

test('accessmanagerCommit', () => {
  accessmanagerCommit({
    organization: 'org',
    space: 'space',
    rootDir: 'oh deaar',
  });
});
