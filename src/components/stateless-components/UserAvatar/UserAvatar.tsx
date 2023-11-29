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

import { forwardRef, LegacyRef, ReactNode } from 'react';
import { BsPersonFill, BsCaretDownFill } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import { textColors, TextColor } from '@customTypes/colorTypes';
import { oneOf } from 'prop-types';
import { Icon } from '@components/index';

interface UserAvatarProps {
  ariaLabel: string;
  size: number;
  color?: TextColor;
  dropdownItems: ReactNode;
}

function UserAvatar({
  ariaLabel,
  color,
  size,
  dropdownItems,
}: UserAvatarProps) {
  type CustomToggleProps = {
    children: React.ReactNode;
    onClick: (event: unknown) => void;
  };

  // FIXME extract child component from parent
  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomToggle = forwardRef(
    (props: CustomToggleProps, ref: LegacyRef<HTMLDivElement>) => (
      <div
        aria-label='toggle'
        role='button'
        tabIndex={0}
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          props.onClick(e);
        }}
        onKeyPress={(e) => {
          e.preventDefault();
          props.onClick(e);
        }}
      >
        {props.children}
        <Icon icon={BsPersonFill} size={size} color={color} />
        <Icon icon={BsCaretDownFill} size={size / 3} color={color} />
      </div>
    )
  );

  CustomToggle.displayName = 'CustomToggle';

  return (
    <div aria-label={ariaLabel} className='d-flex align-items-center'>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components' />
        <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

UserAvatar.propTypes = {
  color: oneOf(textColors),
};

UserAvatar.defaultProps = {
  color: 'text-middle',
};

export default UserAvatar;
