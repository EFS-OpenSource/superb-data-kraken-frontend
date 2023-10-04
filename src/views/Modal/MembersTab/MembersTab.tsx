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

import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
// import { MembersTable } from '@e-fs-frontend-applications/apps/sdk-frontend/src/components/manage-orgas-spaces/MembersTable';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IoAdd, IoClose } from 'react-icons/io5';
import {
  Chip,
  Icon,
  InputSelectPopover,
  AddMemberPopover,
} from '@components/index';
import {
  Owner,
  OrgaSpaceUser,
  UserSpaceRoleType,
  UserOrgaRoleType,
} from '@customTypes/index';
import { useAddRemoveElements } from '@customHooks/index';
import { MembersTable } from '@views/index';

type MembersTabProps = {
  roles: string[];
  initialOwners?: Owner[];
  initialUsers?: (
    | OrgaSpaceUser<UserOrgaRoleType>
    | OrgaSpaceUser<UserSpaceRoleType>
  )[];
  onUpdateOwners?: (updatedOwners: string[]) => void;
  onUpdateUsers?: (updatedUsers: Record<string, unknown>[]) => void;
  isOwner: boolean;
};

function MembersTab({
  onUpdateOwners,
  onUpdateUsers,
  initialUsers,
  initialOwners,
  roles,
  isOwner,
}: MembersTabProps) {
  const { formatMessage } = useIntl();
  const {
    reducer: [owners, dispatchOwners],
  } = useAddRemoveElements<Owner>(initialOwners || [], 'id');

  const { spaceID } = useParams();

  const handleAddOwner = useCallback(
    (_email: string, email: string) => {
      const newOwner = (initialUsers || []).filter(
        (user) => user.email === email
      );
      dispatchOwners({
        type: 'add',
        element: newOwner[0],
      });
    },
    [dispatchOwners, initialUsers]
  );

  const handleRemoveOwner = useCallback(
    (owner: Owner) => {
      const ownerToRemove = owners.filter(
        (currentOwner) => currentOwner.id === owner.id
      );
      dispatchOwners({
        type: 'remove',
        predicate: ownerToRemove[0],
      });
    },
    [owners, dispatchOwners]
  );

  const {
    reducer: [users, dispatchUsers],
  } = useAddRemoveElements<OrgaSpaceUser<string>>(initialUsers || [], 'email');

  const handleAddUser = useCallback(
    (email: string, role: string) => {
      if (!email) return;
      dispatchUsers({
        type: 'add',
        element: {
          id: email,
          email,
          permissions: [role],
          createdTimestamp: 0,
          username: '',
          enabled: true,
          firstName: '',
          lastName: '',
        },
      });
    },
    [dispatchUsers]
  );

  const handleRemoveUser = useCallback(
    (member: OrgaSpaceUser<UserOrgaRoleType | UserSpaceRoleType>) => {
      dispatchUsers({
        type: 'remove',
        predicate: member,
      });
    },
    [dispatchUsers]
  );

  const handleUpdateUser = useCallback(
    (currentUsers: OrgaSpaceUser<string>[]) => {
      dispatchUsers({
        type: 'update',
        element: currentUsers,
      });
    },
    [dispatchUsers]
  );

  const handlePermissionChange = (
    updatedUser: OrgaSpaceUser<UserOrgaRoleType | UserSpaceRoleType>
  ) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id
        ? { ...user, permissions: updatedUser.permissions }
        : user
    );
    handleUpdateUser(updatedUsers);
  };

  useEffect(() => {
    if (onUpdateOwners) onUpdateOwners(owners.map((owner) => owner.id));
  }, [onUpdateOwners, owners]);

  useEffect(() => {
    if (onUpdateUsers)
      onUpdateUsers(
        users.map((user) => ({
          email: user.email,
          permissions: user.permissions,
          id: user.id,
        }))
      );
  }, [onUpdateUsers, users]);

  const handleShow = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  const openPopoverButton = (
    <OverlayTrigger
      placement='right'
      transition={false}
      overlay={
        <Tooltip id='addOwnerTooltip'>
          {formatMessage({
            id: 'AddMemberPopover.add-owner',
          })}
        </Tooltip>
      }
    >
      <div className='me-2'>
        <Icon
          ariaLabel='openAddMemberPopover'
          icon={IoAdd}
          size={28}
          type='button'
          className='p-0 ms-2'
        />
      </div>
    </OverlayTrigger>
  );
  return (
    <div className='w-85' style={{ width: '85%' }}>
      <Form.Group>
        {initialUsers ? (
          <div className='m-0 p-0 d-flex align-items-center h3 font-weight-medium'>
            {formatMessage({
              id: 'Card.Owner',
            })}
            {isOwner && (
              <InputSelectPopover
                id='addOwnerPopover'
                placement='top'
                headline={formatMessage({
                  id: 'Card.Owner',
                })}
                style={{
                  minWidth: '515px',
                  maxWidth: '515px',
                }}
                buttonLabel={formatMessage({
                  id: 'AddMemberPopover.addMember-button',
                })}
                handleShow={handleShow}
                popoverOpenButton={openPopoverButton}
                onSend={(_inputText: string, email: string) =>
                  handleAddOwner(email, email)
                }
                dropdownOptions={
                  spaceID
                    ? initialUsers.map((initialUser) => initialUser.email)
                    : initialUsers
                        .filter(
                          (
                            initialUser: OrgaSpaceUser<
                              UserOrgaRoleType | UserSpaceRoleType
                            >
                          ) =>
                            initialUser.permissions
                              .map((permission) => permission.toUpperCase())
                              .includes('ADMIN')
                        )
                        .map((initialUser) => initialUser.email)
                }
              />
            )}
          </div>
        ) : (
          <div className='m-0 p-0 d-flex align-items-center h3 font-weight-medium'>
            {formatMessage({
              id: 'Card.Owner',
            })}
          </div>
        )}

        {owners &&
          owners.map((owner: Owner) => (
            <Chip
              ariaLabel='tagChip'
              key={owner.id}
              text={`${owner.firstName} ${owner.lastName}`}
              onClick={() => {
                if (initialUsers) {
                  handleRemoveOwner(owner);
                }
              }}
              icon={
                initialUsers && isOwner ? (
                  <Icon
                    ariaLabel='deleteAddEditModalTag'
                    icon={IoClose}
                    type='button'
                    color='text-light'
                    size={16}
                  />
                ) : (
                  <div />
                )
              }
              activeColor='accent'
              size='sm'
              disabled={!initialUsers || !isOwner}
            />
          ))}
      </Form.Group>
      <Form.Group className='mt-3'>
        <AddMemberPopover
          onSetUserData={(email, role) =>
            handleAddUser(email, role.toUpperCase())
          }
          dropdownOptions={roles}
        />
        <div className='ms-4'>
          {users && (
            <MembersTable
              initialMembers={initialUsers}
              members={users}
              onRemoveMember={(member) => handleRemoveUser(member)}
              onHandleChange={(updatedUser) =>
                handlePermissionChange(updatedUser)
              }
              roles={roles}
            />
          )}
        </div>
        {/* <div className="w-75 m-auto text-center border">
          {users && JSON.stringify(users)}
        </div> */}
      </Form.Group>
    </div>
  );
}

export default MembersTab;
