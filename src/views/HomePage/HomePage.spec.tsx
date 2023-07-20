import { render } from '@testing-library/react';
import TestWrapper from 'src/utils/TestWrapper/TestWrapper.spec';

import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';
import Tabs from 'src/components/stateless-components/tabs/Tabs/Tabs';

const disabledStyle = 'none';

jest.mock('@axa-fr/react-oidc', () => ({
  useOidc: () => ({
    oidcUser: {
      profile: { sub: '123' },
      tokens: { id_token: 'abc123', access_token: 'xyz456' },
    },
    login: jest.fn(),
    oidcLogout: jest.fn(),
  }),
  useOidcUser: () => ({
    oidcUser: {
      profile: { sub: '123' },
      tokens: { id_token: 'abc123', access_token: 'xyz456' },
    },
  }),
}));

const tabs = [
  {
    name: 'HomePage.overview',
    id: 'HomePage.overview',
    level: 'primary',
    content: <div>Hello</div>,
    path: 'overview',
  },
  {
    name: 'HomePage.news',
    id: 'HomePage.news',
    level: 'secondary',
    content: <div>Bye</div>,
    path: 'news',
  },
];

describe('HomePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MemoryRouter initialEntries={['/org/2/Overview']}>
          <HomePage />
        </MemoryRouter>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
