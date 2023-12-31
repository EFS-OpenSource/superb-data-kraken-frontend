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

import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import { MemoryRouter } from 'react-router-dom';
import RequireAuthorization from './RequireAuthorization';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'cross-fetch/polyfill';
import { act } from 'react-dom/test-utils';
import '@axa-fr/react-oidc';

const client = new QueryClient();
jest.mock('@axa-fr/react-oidc', () => ({
  useOidc: () => ({
    isAuthenticated: true,
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
  useOidcIdUser: () => ({
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
describe('RequireAuthorization', () => {
  it('should render successfully', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={['/org/436/Overview']}>
              <RequireAuthorization />
            </MemoryRouter>
          </QueryClientProvider>
        </TestWrapper>
      );
    });
  });
});
