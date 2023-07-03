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
