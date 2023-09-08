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
import RequireAuthentication from './RequireAuthentication';
import TestWrapper from 'src/utils/TestWrapper/TestWrapper.spec';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@axa-fr/react-oidc', () => ({
  useOidc: () => ({ isAuthenticated: true }),
}));

describe('RequireAuthentication', () => {
  it('should render Outlet if authenticated', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MemoryRouter initialEntries={['/home/overview']}>
          <RequireAuthentication />
        </MemoryRouter>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should navigate to login if not authenticated', () => {
    jest.resetModules();
    jest.mock('@axa-fr/react-oidc', () => ({
      useOidc: () => ({ isAuthenticated: false }),
    }));
    const { baseElement } = render(
      <TestWrapper>
        <MemoryRouter initialEntries={['/home/overview']}>
          <RequireAuthentication />
        </MemoryRouter>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
