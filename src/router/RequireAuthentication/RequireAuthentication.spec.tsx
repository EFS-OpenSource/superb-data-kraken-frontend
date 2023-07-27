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
