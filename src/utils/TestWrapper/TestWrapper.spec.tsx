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

import { IntlProvider } from 'react-intl';
// import { ReactKeycloakProvider } from '@react-keycloak/web'
import { messagesDe, messagesEn } from '../../translations';

const messages: Record<string, unknown> = {
  de: messagesDe,
  en: messagesEn,
};

const createKeycloakStub = () => ({
  init: jest.fn().mockResolvedValue(true),
  updateToken: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
  accountManagement: jest.fn(),
  createLoginUrl: jest.fn(),
  createLogoutUrl: jest.fn(),
  createRegisterUrl: jest.fn(),
  createAccountUrl: jest.fn(),
  isTokenExpired: jest.fn(),
  clearToken: jest.fn(),
  hasRealmRole: jest.fn(),
  hasResourceRole: jest.fn(),
  loadUserProfile: jest.fn(),
  loadUserInfo: jest.fn(),
});

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ReactKeycloakProvider authClient={createKeycloakStub()}>
    <IntlProvider
      locale="de"
      defaultLocale="de"
      messages={(messages['de'] as any) ?? messages.de}
    >
      {children}
    </IntlProvider>
    // </ReactKeycloakProvider>
  );
};

describe('TestWrapper', () => {
  it('should be true', () => {
    const veryTrue = true;
    expect(veryTrue).toBeTruthy();
  });
});

export default TestWrapper;
