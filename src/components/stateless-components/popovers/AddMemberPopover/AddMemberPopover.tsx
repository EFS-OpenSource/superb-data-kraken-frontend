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

import { useIntl } from 'react-intl';
import { IoAdd } from 'react-icons/io5';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Icon, InputSelectPopover } from '@components/index';
import { DropdownOptions } from '@customTypes/reactSelectTypes';
import React, { useState } from 'react';

interface AddMemberPopoverType {
  dropdownOptions: string[];
  onSetUserData: (
    role: { label: string; value: string },
    email?: string
  ) => void;
  options: DropdownOptions[];
}

function AddMemberPopover({
  dropdownOptions,
  onSetUserData,
  options,
}: // value,
AddMemberPopoverType) {
  const { formatMessage } = useIntl();

  const handleShow = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  const [userEmail, setUserEmail] = useState('');

  const onSetUserEmail = (
    e: React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >
  ) => {
    if (e.value && typeof e.value === 'string') {
      setUserEmail(e.value);
    }
  };

  const openPopoverButton = (
    <OverlayTrigger
      placement='right'
      transition={false}
      overlay={
        <Tooltip id='addSpaceTooltip'>
          {formatMessage({
            id: 'AddMemberPopover.add-member',
          })}
        </Tooltip>
      }
    >
      <div>
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
    <div className='m-0 d-flex align-items-center'>
      <h3 className='m-0 p-0 font-weight-medium'>
        {formatMessage({
          id: 'OrgaSpaceManagement.Members',
        })}
      </h3>
      <InputSelectPopover
        id='addMemberPopover'
        placement='right'
        style={{
          minWidth: '715px',
          maxWidth: '715px',
        }}
        headline={formatMessage({
          id: 'AddMemberPopover.add-member',
        })}
        buttonLabel={formatMessage({
          id: 'AddMemberPopover.addMember-button',
        })}
        handleShow={handleShow}
        popoverOpenButton={openPopoverButton}
        onSend={onSetUserData}
        onChange={(
          e: React.DetailedHTMLProps<
            React.SelectHTMLAttributes<HTMLSelectElement>,
            HTMLSelectElement
          >
        ) => onSetUserEmail(e)}
        dropdownOptions={dropdownOptions}
        selectPlaceholder={formatMessage({
          id: 'AddMemberPopover.add-member',
        })}
        selectPlaceholder2={formatMessage({
          id: 'MembersTable.add-role',
        })}
        selectValue={userEmail}
        selectOptions={options}
        selectIsSearchable
        noOptionsMessage={formatMessage({
          id: 'AddMemberPopover.no-more-members-available',
        })}
        selectStyles={{
          container: (baseStyles) => ({
            ...baseStyles,
            width: '320px',
            paddingRight: '1em',
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            width: '400px',
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            width: '400px',
          }),
        }}
      />
    </div>
  );
}

export default AddMemberPopover;
