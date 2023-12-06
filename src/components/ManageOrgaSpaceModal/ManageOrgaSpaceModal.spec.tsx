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
import { fireEvent, render, screen } from '@testing-library/react';
import ManageOrgaSpaceModal from './ManageOrgaSpaceModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpaceTabs, OrganizationTabs } from '@views/Modal/tabComponents';
import { MapType } from '@customTypes/ManageOrgaSpaceModalTypes';
import MockOrganization from '@assets/UserData';
import 'cross-fetch/polyfill';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import userEvent from '@testing-library/user-event';

const client = new QueryClient();

beforeEach(() => {
  jest.mock('./ManageOrgaSpaceModal', () => ({
    ...jest.requireActual('./ManageOrgaSpaceModal'),
  }));
  // jest.mock('@services/index');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('ManageOrgaSpaceModal', () => {
  it('should render successfully with createOrganization', () => {
    const setShow = jest.fn();
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <ManageOrgaSpaceModal
            show={false}
            setShow={setShow}
            owners={[]}
            tabNames={['General', 'Members']}
            modalType={'createOrganization'}
            tabComponents={OrganizationTabs(true) as unknown as MapType}
            roles={[]}
          />
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with editOrganization', () => {
    const setShow = jest.fn();
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <ManageOrgaSpaceModal
            show={false}
            setShow={setShow}
            owners={[]}
            tabNames={['General', 'Members']}
            modalType={'editOrganization'}
            tabComponents={OrganizationTabs(true) as unknown as MapType}
            roles={[]}
            orgData={MockOrganization}
          />
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with createSpace', () => {
    const setShow = jest.fn();
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <ManageOrgaSpaceModal
            show={false}
            setShow={setShow}
            owners={[]}
            tabNames={['General', 'Members']}
            modalType={'createSpace'}
            tabComponents={SpaceTabs(true) as unknown as MapType}
            roles={[]}
          />
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully with editSpace', () => {
    const setShow = jest.fn();
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <QueryClientProvider client={client}>
          <ManageOrgaSpaceModal
            show={false}
            setShow={setShow}
            owners={[]}
            tabNames={['General', 'Members']}
            modalType={'editSpace'}
            tabComponents={SpaceTabs(true) as unknown as MapType}
            roles={[]}
            spaceData={MockOrganization.spaces[0]}
          />
        </QueryClientProvider>
      </TestWrapperNoOIDC>
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
  it('should not go to next page when creating Organization and name and or company field are not valid', async () => {
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

    const nextButton = screen.getByRole('button', {
      name: 'nextButton',
    });
    await user.click(nextButton);

    expect(nextButton).toBeTruthy();
  });

  it('should be able to go create an organization with required fields name and company', async () => {
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
    const company = await screen.findByText('Unternehmen');
    await user.type(nameInput, 'test name');
    await user.type(company, 'test company');

    const nextButton = screen.getByRole('button', {
      name: 'nextButton',
    });

    await user.click(nextButton);

    const submitButton = await screen.findByRole('button', {
      name: 'submitButton',
    });
    await user.click(submitButton);
  });
  it('should be able to go edit an organization', async () => {
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
            modalType={'editOrganization'}
            tabComponents={OrganizationTabs(true) as unknown as MapType}
            roles={[]}
            orgData={MockOrganization}
          />
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );

    expect(baseElement).toBeTruthy();

    const descriptionInput = await screen.findByRole('textbox', {
      name: 'description',
    });

    await user.type(descriptionInput, 'test description');

    const saveButton = screen.getByText(/speichern/i);

    await user.click(saveButton);
  });

  it('should be able to go create a space with required field name', async () => {
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
            modalType={'createSpace'}
            tabComponents={SpaceTabs(true) as unknown as MapType}
            roles={[]}
          />
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );

    expect(baseElement).toBeTruthy();

    const nameInput = await screen.findByRole('textbox', { name: 'name' });
    await user.type(nameInput, 'test name');

    const nextButton = screen.getByRole('button', {
      name: 'nextButton',
    });

    await user.click(nextButton);

    const submitButton = await screen.findByRole('button', {
      name: 'submitButton',
    });

    await user.click(submitButton);
  });
  it('should be able to go update a space', async () => {
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
            modalType={'editSpace'}
            tabComponents={SpaceTabs(true) as unknown as MapType}
            roles={[]}
            spaceData={MockOrganization.spaces[0]}
          />
        </QueryClientProvider>
      </TestWrapperNoOIDC>
    );

    expect(baseElement).toBeTruthy();

    const saveButton = await screen.findByText(/speichern/i);

    await user.click(saveButton);
  });
  // it('should be able to add new owner in space', async () => {
  //   const user = userEvent.setup();
  //   const setShow = jest.fn();
  //   const orgId = 123;
  //   const spaceId = 234;
  //   const { baseElement } = render(
  //     <TestWrapperNoOIDC>
  //       <QueryClientProvider client={client}>
  //         <MemoryRouter
  //           initialEntries={[`/org/${orgId}/space/${spaceId}/Overview`]}
  //         >
  //           <ManageOrgaSpaceModal
  //             show={true}
  //             setShow={setShow}
  //             owners={[
  //               {
  //                 id: 'sada',
  //                 firstName: 'firstName',
  //                 lastName: 'lastName',
  //               },
  //             ]}
  //             users={[
  //               {
  //                 createdTimestamp: 123123,
  //                 email: 'test@email.com',
  //                 enabled: true,
  //                 firstName: 'Test',
  //                 id: 'string',
  //                 lastName: 'User',
  //                 username: 'string',
  //                 permissions: ['supplier'],
  //               },
  //             ]}
  //             tabNames={['General', 'Members']}
  //             modalType={'editSpace'}
  //             tabComponents={SpaceTabs(true) as unknown as MapType}
  //             roles={['user', 'supplier']}
  //             spaceData={MockOrganization.spaces[0]}
  //             isOwner
  //           />
  //         </MemoryRouter>
  //       </QueryClientProvider>
  //     </TestWrapperNoOIDC>
  //   );

  //   const membersTabButton = screen.getByText('Mitglieder');
  //   await user.click(membersTabButton);

  //   const addOwnerPopupButton = screen.getByRole('button', {
  //     name: 'openAddOwnerPopover',
  //   });
  //   await user.click(addOwnerPopupButton);

  //   // const selectField = screen.getByRole('combobox');
  //   // await user.click(selectField);
  //   console.log(baseElement.innerHTML);

  //   // const saveButton = await screen.findByText(/speichern/i);
  //   // await user.click(saveButton);
  // });
});
