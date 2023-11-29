import formatFileSize from '@utils/formatFileSize';

test('test formatFileSize function', () => {
  formatFileSize(12, 21);
});
test('test formatFileSize function with bytes = 0', () => {
  formatFileSize(0, 21);
});
