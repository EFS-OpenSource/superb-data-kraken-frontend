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

import { CSSProperties } from 'react';
import { IconType } from 'react-icons/lib';
import { BsCircleFill, BsCircle } from 'react-icons/bs';
import PropTypes, { bool, oneOf } from 'prop-types';
import { Icon } from '@components/index';
import { TextColor, textColors } from '@customTypes/colorTypes';

interface ApplicationAvatarProps {
  icon: IconType;
  size: number;
  isActive?: boolean;
  primaryColor?: TextColor;
  secondaryColor?: TextColor;
  style?: CSSProperties | undefined;
}

const ApplicationAvatar = ({
  icon,
  isActive,
  size,
  primaryColor,
  secondaryColor,
  style,
}: ApplicationAvatarProps) => (
  <div
    role="button"
    style={{
      position: 'relative',
      lineHeight: 1,
    }}
    className="p-0 m-0"
  >
    <span
      style={{
        position: 'absolute',
        left: 0,
        fontSize: '1 rem',
        lineHeight: 1,
      }}
    >
      <Icon
        icon={isActive ? BsCircle : BsCircleFill}
        color={secondaryColor}
        size={size}
        style={style}
      />
    </span>
    <span
      style={{
        position: 'absolute',
        left: size * 0.1875,
        top: size * 0.145,
        fontSize: '1 rem',
        lineHeight: 1,
        zIndex: 1,
      }}
    >
      <Icon
        icon={icon}
        color={isActive ? secondaryColor : primaryColor}
        size={size * 0.625}
        style={style}
      />
    </span>
  </div>
);
ApplicationAvatar.propTypes = {
  primaryColor: oneOf(textColors),
  secondaryColor: oneOf(textColors),
  isActive: bool,
};

ApplicationAvatar.defaultProps = {
  isActive: false,
  primaryColor: 'text-primary',
  secondaryColor: 'text-light',
};

export default ApplicationAvatar;
