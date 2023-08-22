import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';
import 'cross-fetch/polyfill';

const client = new QueryClient();

describe('HomePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Overview']}>
            <HomePage />
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
