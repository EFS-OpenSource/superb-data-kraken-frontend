import { renderHook } from '@testing-library/react';
import {
  useConvertSpaceDisplayName,
  useConvertOrganizationDisplayName,
} from '@customHooks/useConvertDisplayName';
test('test hook for converting space name', () => {
  const handleChange = jest.fn();
  renderHook(() =>
    useConvertSpaceDisplayName(
      'aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa ',
      handleChange,
      []
    )
  );
});
test('test hook for converting organization name', () => {
  const handleChange = jest.fn();
  renderHook(() =>
    useConvertOrganizationDisplayName(
      'aaaaaaaaa aaaaaaaaa aaaaaaaaa',
      handleChange,
      []
    )
  );
});
