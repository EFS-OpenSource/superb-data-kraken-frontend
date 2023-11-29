import { renderHook } from '@testing-library/react';
import {
  parseRoles,
  parseAllRoles,
  useGetRoles,
} from '@customHooks/useGetUserRoles';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import 'cross-fetch/polyfill';

import { act } from 'react-dom/test-utils';

describe('test parseRoles & parseAllRoles functions', () => {
  test('parseRole for organization', () => {
    parseRoles(['user'], 'test', 'organization');
  });
  test('parseRole for space', () => {
    parseRoles(['user'], 'test', 'space');
  });
  test('parseAllRoles for organization', () => {
    parseAllRoles('organization', ['user']);
  });
  test('parseAllRoles for space', () => {
    parseAllRoles('space', ['user']);
  });
});

// Test passes, but no coverage
describe('test useGetRoles & useGetAllRoles custom hooks', () => {
  jest.mock('@axa-fr/react-oidc', () => ({
    ...jest.requireActual('@axa-fr/react-oidc'),
    useOidc: () => ({
      oidcUser: {
        profile: { sub: '123' },
        tokens: {
          id_token: 'abc123',
          access_token: 'xyz456',
          access_token_invalid: 'asd',
        },
      },
      isAuthenticated: true,
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
      isAuthenticated: true,
    }),
  }));
  test('useGetRoles custom hook', async () => {
    await act(async () => {
      renderHook(() => useGetRoles('test', 'organization'), {
        wrapper: TestWrapper,
      });
    });
  });
});
