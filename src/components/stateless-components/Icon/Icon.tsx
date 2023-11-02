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
import { useIntl } from 'react-intl';
import PropTypes, { number, oneOf } from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';
import { textColors, TextColor } from '@customTypes/colorTypes';

interface IconProps {
  ariaLabel?: string;
  icon: IconType;
  size?: number;
  color?: TextColor;
  type?: 'icon' | 'button';
  onClick?: () => void;
  className?: string | undefined;
  style?: CSSProperties | undefined;
  tooltip?: string;
  toolptipPlacement?: Placement | undefined;
}

function Icon({
  ariaLabel,
  icon,
  size,
  color,
  type,
  onClick,
  className,
  style,
  tooltip,
  toolptipPlacement,
}: IconProps) {
  const IconName = icon;
  const { formatMessage } = useIntl();

  return tooltip ? (
    <OverlayTrigger
      placement={toolptipPlacement}
      overlay={
        <Tooltip id={`tooltip-${tooltip}`}>
          {formatMessage({
            id: tooltip,
          })}
        </Tooltip>
      }
    >
      <IconName
        aria-label={ariaLabel}
        size={size}
        className={`${color} ${className}`}
        style={style}
        onClick={onClick}
        role={type === 'button' ? 'button' : ''}
      />
    </OverlayTrigger>
  ) : (
    <IconName
      aria-label={ariaLabel}
      size={size}
      className={`${color} ${className}`}
      style={style}
      onClick={onClick}
      role={type === 'button' ? 'button' : ''}
    />
  );
}

Icon.propTypes = {
  size: number,
  color: oneOf(textColors),
  type: oneOf(['icon', 'button']),
};

Icon.defaultProps = {
  size: 16,
  color: 'text-primary',
  type: 'icon',
  toolptipPlacement: 'top',
};

export default Icon;
