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

import React from 'react';
import { BsLock, BsUnlock, BsDoorClosed } from 'react-icons/bs';
import { RiDeleteBin2Line } from 'react-icons/ri';
// import { InputSelectPopover } from '@e-fs-frontend-applications/sdk-frontend/parts/popovers/generic-popovers/InputSelectPopover';
// import { FeatureFlags } from '@e-fs-frontend-applications/sdk-frontend/contexts/FeatureContextProvider';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import { Space, OrgSpaceUserType } from '@customTypes/index';
import Chip from '../../Chip/Chip';
import Icon from '../../Icon/Icon';

function CustomCardTitleLayout({ data, userName, cardType }: OrgSpaceUserType) {
  // const { featureFlag } = React.useContext(FeatureFlags);
  // const { formatMessage } = useIntl();

  // const handleShow = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   e.preventDefault();
  // };

  // const openPopoverButton = (
  //   <Button
  //     aria-label='applyAccessButton'
  //     size='sm'
  //     onClick={(e) => handleShow(e)}
  //   >
  //     {formatMessage({
  //       id: 'Card.Access',
  //     })}
  //   </Button>
  // );

  let iconState;
  let tooltipState;
  const dataForState = (): Space => data as Space;

  switch (dataForState().state) {
    case 'OPEN':
      iconState = BsUnlock;
      tooltipState = 'Lock.open-description';
      break;
    case 'LOCKED':
      iconState = BsLock;
      tooltipState = 'Lock.locked-description';
      break;
    case 'CLOSED':
      iconState = BsDoorClosed;
      tooltipState = 'Lock.closed-description';
      break;
    case 'DELETION':
      iconState = RiDeleteBin2Line;
      tooltipState = 'Lock.deletion-description';
      break;
    case undefined:
      iconState = undefined;
      tooltipState = 'Lock.open-description';
      break;
    default:
      iconState = BsUnlock;
      tooltipState = 'Lock.open-description';
  }

  return (
    <>
      <div className='mt-2 mb-3 d-flex align-items-center'>
        <h3 className='font-weight-medium mb-0 me-4'>
          {data.displayName && (
            <div>
              {data.displayName.length > 20
                ? `${data.displayName.substring(0, 20)}...`
                : data.displayName}
            </div>
          )}
          {!data.displayName && (
            <div>
              {data.name && data.name.length > 20
                ? `${data.name.substring(0, 20)}...`
                : data.name}
            </div>
          )}
        </h3>
        {iconState && (
          <Icon
            icon={iconState}
            tooltip={tooltipState}
            size={26}
            className='ms-1 me-4'
            color={
              dataForState().state === 'DELETION'
                ? 'text-danger'
                : 'text-primary'
            }
          />
        )}
        <Chip
          text={
            data && data.confidentiality && data.confidentiality.toLowerCase()
          }
          size='sm'
          activeColor='outline-accent'
          activeTextColor='accent'
          disabled
          tooltip={`Confidentiality.${data.confidentiality}-description`}
          className='ml-1'
        />
        <Chip
          text={cardType?.toLowerCase()}
          size='sm'
          activeColor='outline-accent'
          activeTextColor='accent'
          disabled
        />
        {/* {featureFlag.requestPermissions && (
          <div className="ms-auto me-2">
            <InputSelectPopover
              id="accessPopover"
              placement="bottom"
              style={{
                minWidth: '620px',
                maxWidth: '620px',
              }}
              headline={formatMessage({
                id: 'Card.Access',
              })}
              inputLabel="Username"
              inputValue={userName}
              disabled
              buttonLabel={formatMessage({
                id: 'ApplyRolesPopover.addRole-button',
              })}
              handleShow={handleShow}
              popoverOpenButton={openPopoverButton}
              openButtonClassName="p-0 ms-auto me-0"
              dropdownOptions={
                cardType === 'space' ? userSpaceRoleTypes : userOrgaRoleTypes
              }
            />
          </div>
        )} */}
      </div>
      <div className='pt-1'>
        {data.tags &&
          data.tags.length > 0 &&
          data.tags.map((tag) => (
            <Chip
              key={tag.name}
              text={tag.name}
              size='sm'
              activeColor='accent'
              disabled
            />
          ))}
      </div>
    </>
  );
}

export default CustomCardTitleLayout;
