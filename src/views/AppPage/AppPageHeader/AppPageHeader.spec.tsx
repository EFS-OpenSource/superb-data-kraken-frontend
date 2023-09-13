/*
Copyright (C) 2023 e:fs TechHub GmbH (sdk@efs-techhub.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppPageHeader from './AppPageHeader';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import MockOrganization from '../../../assets/UserData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'cross-fetch/polyfill';

const client = new QueryClient();

describe('CustomHeader', () => {
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
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
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
      </TestWrapper>,
    );

    expect(baseElement).toBeTruthy();
  });
  it('Collapse Icon/Button should be clickable', (done) => {
    const { baseElement } = render(
      <TestWrapper>
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
      </TestWrapper>,
    );

    waitFor(() => {
      done();
      expect(baseElement).toBeTruthy();
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        fireEvent.click(button);
      });
    });
  });
});
