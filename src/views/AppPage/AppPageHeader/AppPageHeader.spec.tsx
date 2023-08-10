import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppPageHeader from './AppPageHeader';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import MockOrganization from '../../../assets/UserData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();
describe('CustomHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/overview']}>
            <Routes>
              <Route
                path="/org/:orgID/overview"
                element={
                  <AppPageHeader
                    orgData={MockOrganization}
                    spaceData={MockOrganization.spaces[0]}
                  />
                }
              />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapperNoOIDC>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('Collapse Icon/Button should be clickable', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/3/overview']}>
            <Routes>
              <Route
                path="/org/:orgID/overview"
                element={
                  <AppPageHeader
                    orgData={MockOrganization}
                    spaceData={MockOrganization.spaces[0]}
                  />
                }
              />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapperNoOIDC>,
    );

    const buttons = screen.getAllByRole('button');

    buttons.forEach((button) => {
      fireEvent.click(button);
    });
  });
});
