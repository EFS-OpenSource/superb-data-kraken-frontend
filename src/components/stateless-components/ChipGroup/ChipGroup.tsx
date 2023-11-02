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

function ChipGroup({
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
}: ChipGroupProps) {
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
}

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
