import { forwardRef, LegacyRef, ReactNode } from 'react';
import { BsPersonFill, BsCaretDownFill } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Icon } from '../Icon/Icon';
import { textColors, TextColor } from '../../../types/colorTypes';

export interface UserAvatarProps {
  size: number;
  color?: TextColor;
  dropdownItems: ReactNode;
}

export const UserAvatar = ({ color, size, dropdownItems }: UserAvatarProps) => {
  type CustomToggleProps = {
    children: React.ReactNode;
    onClick: (event: unknown) => void;
  };

  // FIXME extract child component from parent
  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomToggle = forwardRef(
    (props: CustomToggleProps, ref: LegacyRef<HTMLDivElement>) => (
      <div
        role="button"
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
    ),
  );

  CustomToggle.displayName = 'CustomToggle';

  return (
    <div className="d-flex align-items-center">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
        <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

UserAvatar.propTypes = {
  color: PropTypes.oneOf(textColors),
};

UserAvatar.defaultProps = {
  color: 'text-middle',
};
