import { oneOf, string } from 'prop-types';
import { colors } from '@customTypes/index';
import Chip from '../Chip/Chip';

type ChipGroupProps = {
  options: { label: string; value: string }[];
  checked: string[];
  disabled?: boolean;
  onChange: (checked: string[]) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  height?: string;
  activeColor?: (typeof colors)[number];
  inactiveColor?: (typeof colors)[number];
  activeTextColor?: string;
  inactiveTextColor?: string;
};

const ChipGroup = ({
  options,
  checked,
  disabled,
  onChange,
  size,
  height,
  activeColor,
  inactiveColor,
  activeTextColor,
  inactiveTextColor,
}: ChipGroupProps) => {
  const handleClick = (value: string, isActive: boolean): void => {
    if (isActive) {
      const index = checked.indexOf(value);
      if (index > -1) {
        checked.splice(index, 1);
        onChange(checked);
      }
    } else {
      checked.push(value);
      onChange(checked);
    }
  };

  return (
    <>
      {options.map((option: Record<string, string>) => (
        <Chip
          key={option.label}
          text={option.value}
          size={size}
          height={height}
          inactiveColor={inactiveColor}
          activeColor={activeColor}
          activeTextColor={activeTextColor}
          inactiveTextColor={inactiveTextColor}
          disabled={disabled}
          state={{
            isActive: checked.includes(option.label),
          }}
          onClick={() =>
            handleClick(option.label, checked.includes(option.label))
          }
        />
      ))}
    </>
  );
};

ChipGroup.propTypes = {
  size: oneOf(['xs', 'sm', 'md', 'lg']),
  height: string,
  activeColor: oneOf(colors),
  inactiveColor: oneOf(colors),
  inactiveTextColor: string,
  activeTextColor: string,
};

ChipGroup.defaultProps = {
  size: 'md',
  height: '23px',
  activeColor: 'accent',
  inactiveColor: 'outline-accent',
  activeTextColor: '#ffffff',
  inactiveTextColor: '',
};

export default ChipGroup;
