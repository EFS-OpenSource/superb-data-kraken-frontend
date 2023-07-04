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

const Icon = ({
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
}: IconProps) => {
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
};

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
