import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import AppPage from './AppPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'cross-fetch/polyfill';

const client = new QueryClient();

describe('AppPage', () => {
  jest.mock('@axa-fr/react-oidc', () => ({
    useOidc: () => ({
      oidcUser: {
        profile: { sub: '123' },
        tokens: {
          id_token: 'abc123',
          access_token: 'xyz456',
          access_token_invalid: 'asd',
        },
      },
      login: jest.fn(),
      oidcLogout: jest.fn(),
    }),
    useOidcIdToken: () => ({
      oidcUser: {
        profile: { sub: '123' },
        tokens: {
          id_token: 'abc123',
          access_token: 'xyz456',
          access_token_invalid: 'asd',
        },
      },
    }),
  }));

  it('should render the header successfully', async () => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Overview']}>
            <Routes>
              <Route path="/org/:orgID/Overview/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(baseElement).toBeTruthy();
    });
  });

  it('should render tabs sucessfully for an organization', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Overview']}>
            <Routes>
              <Route path="/org/:orgID/Overview/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    const overview = baseElement.findByText('Übersicht', {
      selector: 'div',
    });

    waitFor(() => {
      done();
      expect(overview).toBeDefined();
    });
  });

  it('should render tabs sucessfully for a space', (done) => {
    let baseElement: any;
    act(() => {
      baseElement = render(
        <TestWrapper>
          <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={['/org/2/space/234/Overview']}>
              <Routes>
                <Route
                  path="/org/:orgID/space/:spaceID/*"
                  element={<AppPage />}
                />
              </Routes>
            </MemoryRouter>
          </QueryClientProvider>
        </TestWrapper>,
      );
    });

    waitFor(() => {
      done();
      const overview = baseElement.getByText('Übersicht', {
        selector: 'div',
      });
      expect(overview).toBeDefined();
      fireEvent.click(overview);

      const overviewPage = baseElement.getByText('Allgemeine Informationen', {
        selector: 'div',
      });
      expect(overviewPage).toBeDefined();

      const description = baseElement.getByLabelText('title-description');
      expect(description).toBeDefined();
      fireEvent.click(description);
      const descriptionPage = baseElement.findByText('Schema', {
        selector: 'div',
      });
      expect(descriptionPage).toBeDefined();
    });
  });
});
