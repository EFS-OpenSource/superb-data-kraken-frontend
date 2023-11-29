import { renderHook } from '@testing-library/react';
import { useAxiosOidc } from '@services/api/axiosService';

test('useAxiosOidc function', () => {
  renderHook(() => {
    useAxiosOidc('baseURL', 'url', 'GET', {}, {}, {}, false);
  });
});

test('useAxiosOidc function with min arguments', () => {
  renderHook(() => {
    useAxiosOidc('baseURL', 'url');
  });
});
