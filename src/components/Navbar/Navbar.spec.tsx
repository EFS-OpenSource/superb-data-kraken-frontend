import {
  render,
  screen,
  logRoles,
  waitFor,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import Navbar from '@components/Navbar/Navbar';
import 'cross-fetch/polyfill';
import { MemoryRouter } from 'react-router-dom';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  jest.mock('./Navbar');
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
});

afterEach(() => {
  jest.clearAllMocks();
});
describe('test navbar', () => {
  const languageChange = jest.fn();
  it('should render successfully', async () => {
    const user = userEvent.setup();
    let baseElement: RenderResult;
    await act(async () => {
      baseElement = render(
        <TestWrapper>
          <MemoryRouter initialEntries={['/home/overview']}>
            <Navbar onLanguageChange={languageChange} />
          </MemoryRouter>
        </TestWrapper>
      );
      expect(baseElement).toBeTruthy();
    });
  });
});
