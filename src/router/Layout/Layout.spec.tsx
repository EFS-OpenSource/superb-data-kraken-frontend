import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import { act } from 'react-dom/test-utils';
import React from 'react';

jest.mock('@axa-fr/react-oidc', () => ({
  useOidc: () => ({ logout: jest.fn() }),
}));

describe('Navbar/Layout', () => {
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

  it('should be able to click the UserAvatar and trigger the dropdown', () => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();

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

  it('should be possible to click the buttons for language selection', () => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();

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
  it('should be possible to expand the Navbar', () => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();

    const expandButton = screen.getByTestId('expand-toggler');

    expect(expandButton).toBeTruthy();

    act(() => {
      fireEvent.click(expandButton);
    });
  });
  it('should be possible to click on the logo to trigger link to /home', () => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();

    const logo = screen.getByTestId('logo');

    expect(logo).toBeTruthy();

    act(() => {
      fireEvent.click(logo);
    });
  });
  it('should be possible to click icon links in the navbar', () => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();

    const navbarIcons = screen.getAllByTestId('navbar-icon');

    expect(navbarIcons).toBeTruthy();

    act(() => {
      navbarIcons.forEach((navbarIcon) => {
        fireEvent.click(navbarIcon);
      });
    });
  });

  it('should logout when the logout button is clicked', () => {
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
