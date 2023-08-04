import { FC } from 'react';
import { bool, oneOf, shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { colors } from '@customTypes/colorTypes';

export interface ChipProps {
  ariaLabel?: string;
  text?: string | undefined;
  icon?: JSX.Element;
  iconLeft?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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

const Chip: FC<ChipProps> = ({
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
}) => {
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
        <div className="d-flex align-items-center justify-content-center">
          {icon && <span className="me-1">{icon}</span>}
          <span>{`${text || 'ChipText'}`}</span>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <span>{`${text || 'ChipText'} `}</span>
          {icon && <span className="ms-1">{icon}</span>}
        </div>
      )}
    </Button>
  );

  return tooltip ? (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-${tooltip}`}>
          {formatMessage({
            id: tooltip,
          })}
        </Tooltip>
      }
    >
      <span className="d-inline-block">{button}</span>
    </OverlayTrigger>
  ) : (
    button
  );
};

Chip.propTypes = {
  size: oneOf(['xs', 'sm', 'md', 'lg']),
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
