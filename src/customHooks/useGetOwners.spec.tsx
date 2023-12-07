import { renderHook } from '@testing-library/react';
import useGetOwners from '@customHooks/useGetOwners';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const client = new QueryClient();

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);
test('test hook with orgId & spaceId', () => {
  renderHook(() => useGetOwners('123', '456'), { wrapper });
});
test('test hook with orgId & NO spaceId', () => {
  renderHook(() => useGetOwners('123'), { wrapper });
});
