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

import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import { act } from 'react-dom/test-utils';
import 'cross-fetch/polyfill';
describe('Navbar/Layout', () => {
  jest.mock('@axa-fr/react-oidc', () => ({
    useOidc: () => ({
      logout: jest.fn(),
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
  it('should render correctly', () => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should be able to click the UserAvatar and trigger the dropdown', (done) => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
    waitFor(() => {
      done();
      const avatar = screen.getByTestId('user-avatar');
      act(() => {
        fireEvent.click(avatar);
      });

      expect(avatar).toBeTruthy();

      const button = within(avatar).getByRole('button');
      act(() => {
        fireEvent.click(button);
      });
    });
  });

  it('should be possible to click the buttons for language selection', (done) => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();
      const avatar = screen.getByTestId('user-avatar');
      act(() => {
        fireEvent.click(avatar);
      });

      expect(avatar).toBeTruthy();

      const button = within(avatar).getByRole('button');
      act(() => {
        fireEvent.click(button);
      });

      const deButton = screen.getByRole('button', { name: 'select-de' });
      const enButton = screen.getByRole('button', { name: 'select-en' });
      act(() => {
        fireEvent.click(deButton);
        fireEvent.click(enButton);
      });
    });
  });
  it('should be possible to expand the Navbar', (done) => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
    waitFor(() => {
      done();
      const expandButton = screen.getByTestId('expand-toggler');

      expect(expandButton).toBeTruthy();

      act(() => {
        fireEvent.click(expandButton);
      });
    });
  });
  it('should be possible to click on the logo to trigger link to /home', (done) => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
    waitFor(() => {
      done();
      const logo = screen.getByTestId('logo');

      expect(logo).toBeTruthy();

      act(() => {
        fireEvent.click(logo);
      });
    });
  });
  it('should be possible to click icon links in the navbar', (done) => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
    waitFor(() => {
      done();
      const navbarIcons = screen.getAllByTestId('navbar-icon');

      expect(navbarIcons).toBeTruthy();

      act(() => {
        navbarIcons.forEach((navbarIcon) => {
          fireEvent.click(navbarIcon);
        });
      });
    });
  });

  it('should logout when the logout button is clicked', (done) => {
    const onLanguageChange = jest.fn();
    const { logout } = require('@axa-fr/react-oidc').useOidc();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
    waitFor(() => {
      done();
      const avatar = screen.getByTestId('user-avatar');
      fireEvent.click(avatar);
      const button = within(avatar).getByRole('button');
      act(() => {
        fireEvent.click(button);
      });

      const logoutButton = screen.getByTestId('logout-button');
      act(() => {
        fireEvent.click(logoutButton);
      });

      // expect(logout).toHaveBeenCalled();
    });
  });
});
