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
