import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useOidc } from '@axa-fr/react-oidc';
import { useNavigate } from 'react-router-dom';

jest.mock('@axa-fr/react-oidc', () => ({
  useOidc: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginPage Component', () => {
  const loginMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useOidc as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: loginMock,
    });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call login function when rendered', () => {
    render(
      <Router>
        <LoginPage />
      </Router>,
    );

    expect(loginMock).toHaveBeenCalled();
  });

  test('should call navigate function when user is authenticated', () => {
    (useOidc as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      login: loginMock,
    });

    render(
      <Router>
        <LoginPage />
      </Router>,
    );

    expect(navigateMock).toHaveBeenCalled();
  });
});
