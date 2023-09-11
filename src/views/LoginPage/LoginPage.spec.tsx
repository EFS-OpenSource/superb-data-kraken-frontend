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
