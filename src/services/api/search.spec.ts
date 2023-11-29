import { getFilterCriteria, getResultProperties } from '@services/api/search';

test('getFilterCriteria function', () => {
  getFilterCriteria('index');
});

test('getResultProperties function', () => {
  getResultProperties('index');
});
