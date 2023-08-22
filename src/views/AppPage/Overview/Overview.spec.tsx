import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Confidentiality, SpaceState } from '@customTypes/index';
import OverviewApp from './Overview';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';

const orgData = {
  id: 2,
  name: 'sdkcorestorage',
  description: 'core storage',
  confidentiality: 'INTERNAL' as Confidentiality,
  tags: [{ name: '#storage' }, { name: '#deposit' }],
  state: 'OPEN' as SpaceState,
  company: 'we',
  owners: [
    'Peter Parker',
    'Paul McCartney',
    'Mary J. Blige',
    'Michael Jackson',
    'Martin Guenduez',
  ],
  members: [
    {
      name: 'ORG Benutzer 1',
      email: 'benutzer1@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 2',
      email: 'benutzer2@email.com',
      roles: ['User', 'Supplier'],
    },
    {
      name: 'Benutzer 3',
      email: 'benutzer3@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 4',
      email: 'benutzer4@email.com',
      roles: ['User', 'Trustee'],
    },
    {
      name: 'Benutzer 5',
      email: 'benutzer5@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 6',
      email: 'benutzer6@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 7',
      email: 'benutzer7@email.com',
      roles: ['User', 'Supplier'],
    },
    {
      name: 'Benutzer 8',
      email: 'benutzer8@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 9',
      email: 'benutzer9@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 10',
      email: 'benutzer10@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 11',
      email: 'benutzer11@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 12',
      email: 'benutzer12@email.com',
      roles: ['User', 'Owner'],
    },
    {
      name: 'Benutzer 13',
      email: 'benutzer13@email.com',
      roles: ['User'],
    },
  ],
  displayName: 'sdkcorestorage',
  userRoles: [],
  appConfigs: [],
  gdprRelevant: true,
  spaces: [],
};

const spaceData = {
  orgId: 2,
  id: 170,
  name: 'sdkdemo',
  identifier: 'sdkdemo',
  defaultRetentionTime: 365,
  description: 'SDK Demo Bereich',
  confidentiality: 'INTERNAL' as Confidentiality,
  metadataGenerate: true,
  userRoles: [],
  tags: [
    {
      name: '#sdkDemo',
    },
  ],
  capabilities: [],
  owners: ['Martin Guenduez'],
  members: [
    {
      name: 'SPACE Benutzer 1',
      email: 'benutzer1@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 2',
      email: 'benutzer2@email.com',
      roles: ['User', 'Supplier'],
    },
    {
      name: 'Benutzer 3',
      email: 'benutzer3@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 4',
      email: 'benutzer4@email.com',
      roles: ['User', 'Trustee'],
    },
    {
      name: 'Benutzer 5',
      email: 'benutzer5@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 6',
      email: 'benutzer6@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 7',
      email: 'benutzer7@email.com',
      roles: ['User', 'Supplier'],
    },
    {
      name: 'Benutzer 8',
      email: 'benutzer8@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 9',
      email: 'benutzer9@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 10',
      email: 'benutzer10@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 11',
      email: 'benutzer11@email.com',
      roles: ['User'],
    },
    {
      name: 'Benutzer 12',
      email: 'benutzer12@email.com',
      roles: ['User', 'Owner'],
    },
    {
      name: 'Benutzer 13',
      email: 'benutzer13@email.com',
      roles: ['User'],
    },
  ],
  appConfigs: [],
  state: 'OPEN' as SpaceState,
  displayName: 'sdkdemo',
  schemaRef: '',
  descriptionRef: '',
  metadataIndexName: 'sdkcorestorage_sdkdemo_measurements',
  gdprRelevant: true,
};
// ...
describe('OverviewApp', () => {
  it('should render the overview for a space successfully', async () => {
    const baseElement = render(
      <TestWrapperNoOIDC>
        <MemoryRouter initialEntries={['/org/2/space/170/overview']}>
          <Routes>
            <Route
              path="/org/:orgID/space/:spaceID/overview"
              element={<OverviewApp orgData={orgData} spaceData={spaceData} />}
            />
          </Routes>
        </MemoryRouter>
      </TestWrapperNoOIDC>,
    );
    const descriptionPage = baseElement.findByText('Allgemeine Informationen', {
      selector: 'div',
    });
    expect(descriptionPage).toBeDefined();
    await waitFor(() => {
      const spaceName = baseElement.findByText('sdkdemo', {
        selector: 'div',
      });
      expect(spaceName).toBeDefined();
    });
  });

  // async await not necessary, leaving it as reminder, remove if you are first to use it elsewhere
  it('should render the overview for an organization successfully', async () => {
    const baseElement = render(
      <TestWrapperNoOIDC>
        <MemoryRouter initialEntries={['/org/2/overview']}>
          <Routes>
            <Route
              path="/org/:orgID/overview"
              element={<OverviewApp orgData={orgData} spaceData={spaceData} />}
            />
          </Routes>
        </MemoryRouter>
      </TestWrapperNoOIDC>,
    );
    const overviewApp = baseElement.getByText('Allgemeine Informationen', {
      selector: 'div',
    });
    expect(overviewApp).toBeDefined();
    await waitFor(() => {
      const owners = baseElement.getByText('Eigentümer', {
        selector: 'div',
      });
      expect(owners).toBeDefined();
    });
  });
});
