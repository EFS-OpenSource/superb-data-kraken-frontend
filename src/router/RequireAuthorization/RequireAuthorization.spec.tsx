import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import { MemoryRouter } from 'react-router-dom';
import RequireAuthorization from './RequireAuthorization';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();
describe('RequireAuthorization', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/home/overview']}>
            <RequireAuthorization />
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
