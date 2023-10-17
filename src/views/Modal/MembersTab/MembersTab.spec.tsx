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

import { fireEvent, getByTestId, getByText, queryByText, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import MembersTab from './MembersTab';
import { OrgaSpaceUser, OrgaUser, Owner, SpaceUser } from '@customTypes/userTypes';
import { UserOrgaRoleType } from '@customTypes/organizationTypes';

describe('MembersTab', () => {
  const owner: Owner = {
    id: '0',
    firstName: 'Someone',
    lastName: 'Stranger'}
  
  const user: SpaceUser = {
    id: '0',
    createdTimestamp: 3,
    username: "someUserName",
    enabled: true,
    firstName: "Someone",
    lastName: "strange",
    email: "someone@strange.com",
    permissions: 'trustee'
  }

  const anotherUser: OrgaUser = {
    id: '1',
    createdTimestamp: 4,
    username: "anotherUserName",
    enabled: true,
    firstName: "Someone",
    lastName: "strangeToo",
    email: "someone@strangeToo.com",
    permissions: 'admin'
  }
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MembersTab 
          roles={[]}
          isOwner={true} 
          initialUsers={[]}        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with initialOwners', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MembersTab 
          roles={[]}
          isOwner={true}
          initialOwners={[owner]} initialUsers={[]}        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with initialUsers', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MembersTab 
        roles={[]} 
        isOwner={true}
        initialUsers={[user]}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with initialUsers & initialOwners', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MembersTab 
        roles={[]} 
        isOwner={true}
        initialOwners={[owner]}
        initialUsers={[user]}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with onUpdateOwners', () => {
    const onUpdateOwners = jest.fn()
    const { baseElement } = render(
      <TestWrapper>
        <MembersTab 
        onUpdateOwners={onUpdateOwners}
        roles={[]} 
        isOwner={true}
        initialOwners={[owner]}
        initialUsers={[user]}
        />
      </TestWrapper>,
    );
    expect(onUpdateOwners).toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with onUpdateUsers', () => {
    const onUpdateUsers = jest.fn()
    const { baseElement } = render(
      <TestWrapper>
        <MembersTab 
        onUpdateUsers={onUpdateUsers}
        roles={[]} 
        isOwner={true}
        initialOwners={[owner]}
        initialUsers={[user, anotherUser]}
        />
      </TestWrapper>,
    );
    expect(onUpdateUsers).toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });
  it('test removing owner', async () => {
    const { baseElement } = render(
      <TestWrapper>
        <MembersTab 
        roles={[]} 
        isOwner={true}
        initialOwners={[owner]}
        initialUsers={[user, anotherUser]}
        />
      </TestWrapper>,
    );
    const ownerChipBefore = getByText(baseElement, `${owner.firstName} ${owner.lastName}`);
    expect(ownerChipBefore).toBeTruthy();
    fireEvent.click(ownerChipBefore);
    const ownerChipAfter = queryByText(baseElement, `${owner.firstName} ${owner.lastName}`);
    expect(ownerChipAfter).toBeFalsy();
    expect(baseElement).toBeTruthy();
  });
});
