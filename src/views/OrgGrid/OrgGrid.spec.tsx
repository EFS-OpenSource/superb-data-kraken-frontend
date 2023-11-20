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
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { OrgGrid } from '@views/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import 'cross-fetch/polyfill';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import MockOrganization from '@assets/UserData';

const client = new QueryClient();

const userinfo = {
  roles: ['org_create_permission'],
  given_name: 'Martin',
  family_name: 'Guenduez',
  sub: 'asdaef',
};
beforeEach(() => {
  jest.mock('./OrgGrid', () => ({
    ...jest.requireActual('./OrgGrid'),
    sdkAdmin: () => {
      return [
        {
          firstName: 'Martin',
          lastName: 'Guenduez',
          id: 'usbad',
        },
      ];
    },
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});
describe('OrgGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Overview']}>
            <OrgGrid username='Peter' orgasWithSpaces={[]} userInfo={[]} />
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );
    expect(baseElement).toBeTruthy();
  });
});

describe('Filter Chips', () => {
  it('should test the clickability of the filter chip buttons', () => {
    render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Overview']}>
            <OrgGrid username='Peter' orgasWithSpaces={[]} userInfo={[]} />
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );

    const chipOrgas = screen.getByRole('button', { name: 'Organisationen' });
    const chipSpaces = screen.getByRole('button', { name: 'Spaces' });
    const all = screen.getByRole('button', { name: 'Alle' });

    // Testing different combinations of filter buttons
    fireEvent.click(chipOrgas);
    fireEvent.click(chipSpaces);
    fireEvent.click(all);

    fireEvent.click(chipOrgas);
    fireEvent.click(all);

    fireEvent.click(chipSpaces);
    fireEvent.click(all);

    fireEvent.click(chipOrgas);
    fireEvent.click(chipSpaces);
    fireEvent.click(chipOrgas);
    fireEvent.click(chipSpaces);
  });
});

describe('Searchbar', () => {
  it('typing into the search bar should trigger search functionality', () => {
    render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Overview']}>
            <OrgGrid username='Peter' orgasWithSpaces={[]} userInfo={[]} />
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );
    const searchBar = screen.getByRole('textbox', { name: 'searchBar' });
    const chipOrgas = screen.getByRole('button', { name: 'Organisationen' });
    const chipSpaces = screen.getByRole('button', { name: 'Spaces' });
    const all = screen.getByRole('button', { name: 'Alle' });

    // Testing different searches with and without different filter chips active
    fireEvent.change(searchBar, { target: { value: 'a' } });

    fireEvent.click(chipOrgas);
    fireEvent.click(chipSpaces);
    fireEvent.change(searchBar, { target: { value: 'a' } });
    fireEvent.click(all);

    fireEvent.click(chipOrgas);
    fireEvent.click(chipSpaces);
    fireEvent.change(searchBar, { target: { value: '' } });
    fireEvent.click(all);

    fireEvent.click(chipOrgas);
    fireEvent.change(searchBar, { target: { value: 'a' } });
    fireEvent.click(all);

    fireEvent.click(chipSpaces);
    fireEvent.change(searchBar, { target: { value: 'a' } });
    fireEvent.click(all);

    fireEvent.submit(searchBar);
  });
});
describe('Add Org Button', () => {
  it('clicking add organization button should open modal', async () => {
    const baseElement = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/home/overview']}>
            <OrgGrid
              username='Martin'
              orgasWithSpaces={[]}
              userInfo={userinfo}
            />
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );

    const addOrgaButton = await screen.findByRole('button', {
      name: 'addOrganizationButton',
    });
    act(() => {
      fireEvent.click(addOrgaButton);
    });
    expect(baseElement).toBeDefined();

    expect(addOrgaButton).toBeDefined();
  });
});
describe('Map organizations and spaces', () => {
  it('should map all orgs and spaces the user has access to', async () => {
    render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/home/overview']}>
            <OrgGrid
              username='Martin'
              orgasWithSpaces={[MockOrganization]}
              userInfo={[]}
            />
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );

    const orgCard = await screen.findByText('sdkcorestorage');

    expect(orgCard).toBeDefined();
    fireEvent.click(orgCard);

    const spaceCard = await screen.findByText('sdkdemo');

    expect(spaceCard).toBeDefined();
    fireEvent.click(spaceCard);
  });
});
