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

import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SdkRouter from './SdkRouter';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';
// global.fetch = jest.fn();
describe('SdkRouter', () => {
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
    useOidcUser: () => ({
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
  it('should render successfully', async () => {
    const { baseElement } = render(
      <TestWrapper>
        <MemoryRouter initialEntries={['/home/overview']}>
          <SdkRouter />
        </MemoryRouter>
      </TestWrapper>
    );
    await waitFor(() => {
      expect(baseElement).toBeTruthy();
      console.log(baseElement.innerHTML);
    });
  });
});
// it('should redirect unauthenticated request to LoginPage', () => {
//     const { baseElement } = render(
//         <MemoryRouter initialEntries={['/home/overview']}>
//             <TestWrapper>
//                 <SdkRouter />
//             </TestWrapper>
//         </MemoryRouter>
//     )
//     const loginIcon = baseElement.querySelector('svg')
//     expect(loginIcon).toBeTruthy()
// })
// toDo: mock keycloak...
// it('should render HomePage if user is authenticated', () => {
//     const { baseElement } = render(
//         <TestWrapper>
//             <MemoryRouter initialEntries={['/home/overview']}>
//                 <Routes>
//                     <Route path='/home/*' element={<HomePage />} />
//                 </Routes>
//             </MemoryRouter>
//         </TestWrapper>
//     )
//     const title = baseElement.querySelector('h1')
//     expect(title?.textContent).toContain(
//         'Willkommen auf der SDK Plattform, '
//     )
// })
