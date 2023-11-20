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

import { lazy } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import ManageOrgaSpaceModal from './ManageOrgaSpaceModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpaceTabs, OrganizationTabs } from '@views/Modal/tabComponents';
import { MapType } from '@customTypes/ManageOrgaSpaceModalTypes';
import MockOrganization from '@assets/UserData';
import 'cross-fetch/polyfill';
import { MemoryRouter } from 'react-router-dom';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const client = new QueryClient();

beforeEach(() => {
  jest.mock('./ManageOrgaSpaceModal', () => ({
    ...jest.requireActual('./ManageOrgaSpaceModal'),
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('ManageOrgaSpaceModal', () => {
  it('should render successfully', () => {
    const setShow = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <ManageOrgaSpaceModal
            show={false}
            setShow={setShow}
            owners={[]}
            tabNames={['General', 'Members']}
            modalType={'createOrganization'}
            tabComponents={SpaceTabs(true) as unknown as MapType}
            roles={[]}
          />
        </QueryClientProvider>
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should be able to cancel the modal', async () => {
    const setShow = jest.fn();
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <ManageOrgaSpaceModal
            show={true}
            setShow={setShow}
            owners={[]}
            users={[]}
            tabNames={['General', 'Members']}
            modalType={'createOrganization'}
            tabComponents={OrganizationTabs(true) as unknown as MapType}
            roles={[]}
            orgData={MockOrganization}
          />
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );

    expect(baseElement).toBeTruthy();

    const cancelButton = await screen.findByRole('button', {
      name: 'cancelButton',
    });

    fireEvent.click(cancelButton);
  });
  it('should be able to go to next page of the modal', async () => {
    const setShow = jest.fn();
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <ManageOrgaSpaceModal
            show={true}
            setShow={setShow}
            owners={[]}
            users={[]}
            tabNames={['General', 'Members']}
            modalType={'createOrganization'}
            tabComponents={OrganizationTabs(true) as unknown as MapType}
            roles={[]}
            orgData={MockOrganization}
          />
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );

    expect(baseElement).toBeTruthy();

    const nextButton = await screen.findByRole('button', {
      name: 'nextButton',
    });

    fireEvent.click(nextButton);
  });
  it('should be able to go to next page of the modal and then submit', async () => {
    const user = userEvent.setup();
    const setShow = jest.fn();
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <ManageOrgaSpaceModal
            show={true}
            setShow={setShow}
            owners={[]}
            users={[]}
            tabNames={['General', 'Members']}
            modalType={'createOrganization'}
            tabComponents={OrganizationTabs(true) as unknown as MapType}
            roles={[]}
          />
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );

    expect(baseElement).toBeTruthy();

    const nameInput = await screen.findByRole('textbox', { name: 'name' });

    const nextButton = screen.getByRole('button', {
      name: 'nextButton',
    });

    act(() => {
      user.type(nameInput, 'test name');
      user.click(nextButton);
    });

    const submitButton = await screen.findByRole('button', {
      name: 'submitButton',
    });

    act(() => {
      user.click(submitButton);
    });

    console.log(baseElement.innerHTML);
  });
});
