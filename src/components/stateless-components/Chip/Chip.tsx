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

import { bool, oneOf, shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { colors } from '@customTypes/colorTypes';

export interface ChipProps {
  ariaLabel?: string;
  text?: string | undefined;
  icon?: JSX.Element;
  iconLeft?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default';
  height?: string;
  activeColor?: (typeof colors)[number];
  inactiveColor?: (typeof colors)[number];
  activeTextColor?: string;
  inactiveTextColor?: string;
  onClick?: (e?: any) => void;
  state?: { isActive: boolean | undefined };
  disabled?: boolean;
  tooltip?: string;
  className?: string;
}

function Chip({
  ariaLabel,
  text,
  icon,
  iconLeft,
  size,
  height,
  activeColor,
  inactiveColor,
  inactiveTextColor,
  activeTextColor,
  onClick,
  state,
  disabled,
  tooltip,
  className,
}: ChipProps) {
  const { formatMessage } = useIntl();
  let fontSize;
  let textColor;

  switch (size) {
    case 'xs':
      fontSize = 'x-small';
      break;
    case 'sm':
      fontSize = '0.75rem';
      break;
    case 'md':
      fontSize = 'medium';
      break;
    case 'lg':
      fontSize = '1.2rem';
      break;
    case 'xl':
      fontSize = '1.5rem';
      break;
    default:
      fontSize = '0.75rem';
  }

  switch (state?.isActive) {
    case true:
      textColor = activeTextColor;
      break;
    case false:
      textColor = inactiveTextColor;
      break;
    default:
      textColor = '';
  }

  const button = (
    <Button
      aria-label={ariaLabel}
      variant={state?.isActive ? activeColor : inactiveColor}
      onClick={onClick}
      className={`${className} me-3 py-0 px-2`}
      disabled={disabled}
      style={
        disabled
          ? {
              fontSize,
              opacity: 1,
              height,
              color: textColor,
              pointerEvents: 'none',
            }
          : { fontSize, height, color: textColor }
      }
    >
      {iconLeft ? (
        <div className='d-flex align-items-center justify-content-center'>
          {icon && <span className='me-1'>{icon}</span>}
          <span>{`${text || 'ChipText'}`}</span>
        </div>
      ) : (
        <div className='d-flex align-items-center justify-content-center'>
          <span>{`${text || 'ChipText'} `}</span>
          {icon && <span className='ms-1'>{icon}</span>}
        </div>
      )}
    </Button>
  );

  return tooltip ? (
    <OverlayTrigger
      placement='top'
      overlay={
        <Tooltip id={`tooltip-${tooltip}`}>
          {formatMessage({
            id: tooltip,
          })}
        </Tooltip>
      }
    >
      <span className='d-inline-block'>{button}</span>
    </OverlayTrigger>
  ) : (
    button
  );
}

Chip.propTypes = {
  size: oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  height: string,
  activeColor: oneOf(colors),
  inactiveColor: oneOf(colors),
  inactiveTextColor: string,
  activeTextColor: string,
  state: shape({ isActive: bool.isRequired }),
};

Chip.defaultProps = {
  size: 'sm',
  height: '23px',
  activeColor: 'middle',
  inactiveColor: 'accent',
  activeTextColor: '#ffffff',
  inactiveTextColor: '',
  state: { isActive: true },
};

export default Chip;
