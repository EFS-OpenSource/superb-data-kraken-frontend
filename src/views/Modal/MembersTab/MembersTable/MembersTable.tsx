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

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { createColumnHelper } from '@tanstack/react-table';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Chip, Icon, InputSelectPopover, CustomTable } from '@components/index';
import {
  OrgaSpaceUser,
  userSpaceRoleTypes,
  UserSpaceRoleType,
  userOrgaRoleTypes,
  UserOrgaRoleType,
  MembersToRenderType,
  OrgaUser,
  SpaceUser,
} from '@customTypes/index';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoAdd, IoClose } from 'react-icons/io5';

const columnHelper = createColumnHelper<MembersToRenderType>();

type UsersUnionType = OrgaSpaceUser<string> | OrgaSpaceUser<string>;

type MembersTableProps = {
  initialMembers: OrgaUser[] | SpaceUser[];
  members: OrgaUser[] | SpaceUser[];
  roles: UserOrgaRoleType | UserSpaceRoleType;
  onRemoveMember: (member: OrgaUser | SpaceUser) => void;
  onHandleChange: (passedData: UsersUnionType) => void;
};

function MembersTable({
  initialMembers,
  members,
  roles,
  onRemoveMember,
  onHandleChange,
}: MembersTableProps) {
  const { formatMessage } = useIntl();

  const [membersToRender, setMembersToRender] = useState<MembersToRenderType[]>(
    []
  );

  const { spaceID } = useParams();

  const roleCount = spaceID
    ? userSpaceRoleTypes.length
    : userOrgaRoleTypes.length;

  const columns = useMemo(
    () => [
      columnHelper.accessor('memberName', {
        header: formatMessage({
          id: 'MembersTable.name',
        }),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('memberEmail', {
        header: formatMessage({
          id: 'MembersTable.contact',
        }),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('memberRoles', {
        header: formatMessage({
          id: 'MembersTable.roles',
        }),
        cell: (info) => info.getValue(),
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor('memberAction', {
        header: formatMessage({
          id: 'MembersTable.action',
        }),
        cell: (info) => info.getValue(),
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    []
  );

  const [membersToHandle, setMembersToHandle] = useState<
    OrgaUser[] | SpaceUser[]
  >([]);

  useEffect(() => {
    if (spaceID) {
      const initialMembersSpace = initialMembers
        ? initialMembers?.map((member) => ({
            ...member,
            permissions: member.permissions as unknown as UserSpaceRoleType,
          }))
        : undefined;
      setMembersToHandle(initialMembersSpace as unknown as SpaceUser[]);
    } else {
      const initialMembersOrga = initialMembers
        ? initialMembers?.map((member) => ({
            ...member,
            permissions: member.permissions as unknown as UserOrgaRoleType,
          }))
        : undefined;
      setMembersToHandle(initialMembersOrga as unknown as OrgaUser[]);
    }
  }, [initialMembers, spaceID]);

  const handleAddPermission = useCallback(
    (
      member: OrgaSpaceUser<string>,
      permission: string /* //TODO permission has a known type but this collides with AddTagPopover type Definition. AddTagPopover should be generalized  */
    ) => {
      console.log(member, permission);
      if (!member.permissions.includes(permission)) {
        onHandleChange({
          ...member,
          permissions: member.permissions
            ? [...member.permissions, permission]
            : [permission],
        });
      }
    },
    [onHandleChange]
  );

  const handleRemovePermission = useCallback(
    (
      member: OrgaUser | SpaceUser /* //TODO */,
      permission: string /* //TODO permission has a known type but this collides with AddTagPopover type Definition. AddTagPopover should be generalized  */
    ) => {
      const permissionsFixed: Array<(typeof member.permissions)[number]> =
        member.permissions as unknown as string[];
      onHandleChange({
        ...member,
        permissions: permissionsFixed.filter((p: string) => p !== permission),
      });
    },
    [onHandleChange]
  );

  const handleRemoveAllPermissions = useCallback(
    (member: OrgaUser | SpaceUser) => {
      onHandleChange({
        ...member,
        permissions: [],
      });
    },
    [onHandleChange]
  );

  const handleRevokeDeletion = useCallback(
    (member: OrgaUser | SpaceUser) => {
      const initialUsersFixed: Array<(typeof membersToHandle)[number]> = spaceID
        ? (membersToHandle as SpaceUser[])
        : (membersToHandle as OrgaUser[]);

      const revokedMember = initialUsersFixed
        ? initialUsersFixed.find(
            (initialMember: OrgaUser | SpaceUser) =>
              initialMember.email === member.email
          )
        : [''];
      if (revokedMember && 'permissions' in revokedMember && spaceID) {
        const perms = revokedMember.permissions as unknown as string[];
        onHandleChange({
          ...(member as SpaceUser),
          permissions: perms,
        });
      } else if (revokedMember && 'permissions' in revokedMember && !spaceID) {
        onHandleChange({
          ...(member as OrgaUser),
          permissions: revokedMember.permissions as unknown as string[],
        });
      }
    },
    [membersToHandle, onHandleChange, spaceID]
  );

  const handleShow = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  const openPopoverButton = useMemo(
    () => (
      <OverlayTrigger
        placement='right'
        transition={false}
        overlay={
          <Tooltip id='addRoleTooltip'>
            {formatMessage({
              id: 'MembersTable.add-role',
            })}
          </Tooltip>
        }
      >
        <div className='me-2'>
          <Icon
            ariaLabel='openAddMemberPopover'
            icon={IoAdd}
            size={20}
            type='button'
            className='p-0 ms-2'
          />
        </div>
      </OverlayTrigger>
    ),
    [formatMessage]
  );

  const buttonPlaceholder = (
    <div className='me-2'>
      <div style={{ width: '28px' }} />
    </div>
  );

  useEffect(() => {
    const memberArray: MembersToRenderType[] = [];

    members?.forEach((member: OrgaUser | SpaceUser) => {
      const permissionsArray = member.permissions as unknown as string[];

      const roles1 = new Set(
        permissionsArray.map((perm) => perm.toUpperCase())
      );
      const roles2 = new Set(
        Array.from(roles).map((role) => role.toUpperCase())
      );

      const uniqueRoles = [
        ...permissionsArray.filter((perm) => !roles2.has(perm.toUpperCase())),
        ...Array.from(roles).filter((perm) => !roles1.has(perm.toUpperCase())),
      ];

      const popoverButton =
        member.permissions.length < roleCount
          ? openPopoverButton
          : buttonPlaceholder;
      memberArray.push({
        memberName:
          member && member.firstName && member.lastName
            ? `${member.firstName} ${member.lastName}`
            : '',
        memberEmail: member.email,
        memberRoles: (
          <Form.Group className='d-flex m-0'>
            <InputSelectPopover
              id='addRolePopover'
              placement='top'
              style={{
                minWidth: '415px',
                maxWidth: '415px',
              }}
              buttonLabel={formatMessage({
                id: 'AddMemberPopover.addMember-button',
              })}
              handleShow={handleShow}
              popoverOpenButton={popoverButton}
              onSend={(_email, role) =>
                handleAddPermission(
                  member as OrgaSpaceUser<string>,
                  role.toUpperCase()
                )
              }
              dropdownOptions={uniqueRoles}
            />

            {permissionsArray.length !== 0 ? (
              permissionsArray.map((permission: string) => (
                <Chip
                  ariaLabel='permissionTagChip'
                  key={permission}
                  text={permission.toLocaleLowerCase()}
                  onClick={() => handleRemovePermission(member, permission)}
                  icon={
                    <Icon
                      ariaLabel='deleteAddEditModalTag'
                      icon={IoClose}
                      type='button'
                      color='text-light'
                      size={16}
                    />
                  }
                  activeColor='accent'
                  size='sm'
                />
              ))
            ) : (
              <Chip
                ariaLabel='deletionTagChip'
                key='deletionTagChip'
                text={formatMessage({
                  id: 'AddMemberPopover.remove-member',
                })}
                onClick={() => handleRevokeDeletion(member)}
                icon={
                  <Icon
                    ariaLabel='deleteAddEditModalTag'
                    icon={IoClose}
                    type='button'
                    color='text-light'
                    size={16}
                  />
                }
                activeColor='danger'
                size='sm'
              />
            )}
          </Form.Group>
        ),
        memberAction:
          member.permissions.length !== 0 ? (
            <div className='d-flex'>
              <Icon
                ariaLabel='openAddMemberPopover'
                icon={RiDeleteBin6Line}
                size={20}
                type='button'
                className='m-auto'
                onClick={() =>
                  initialMembers
                    ? handleRemoveAllPermissions(member)
                    : onRemoveMember(member)
                }
              />
            </div>
          ) : undefined,
      });
    });

    setMembersToRender(memberArray);
  }, [
    formatMessage,
    handleAddPermission,
    handleRemoveAllPermissions,
    handleRemovePermission,
    handleRevokeDeletion,
    initialMembers,
    members,
    onRemoveMember,
    openPopoverButton,
    roles,
  ]);

  return (
    <>
      <div className='mt-4'>
        <CustomTable
          columns={columns}
          data={membersToRender}
          tableName='ModalMembersTable'
          withDropdownColumnSelect={false}
          withDropdownRowCount={false}
          customRowCount={5}
        />
      </div>
      <p className='text-center mt-4' style={{ fontSize: '0.75rem' }}>
        <span>
          {!spaceID &&
            formatMessage({
              id: 'MembersTable.note-admin-owner',
            })}
        </span>
        <br />
        <br />
        <span>
          {!spaceID &&
            formatMessage({
              id: 'MembersTable.note-admin-owner2',
            })}
        </span>
      </p>
    </>
  );
}

export default MembersTable;
