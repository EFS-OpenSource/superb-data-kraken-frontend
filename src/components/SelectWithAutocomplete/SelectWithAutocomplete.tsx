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

import Select, {
  CSSObjectWithLabel,
  GroupBase,
  StylesConfig,
} from 'react-select';
import { DropdownOptions } from '@customTypes/index';

export interface SelectWithAutocompleteProps {
  options: DropdownOptions[];
  onChange: (value: DropdownOptions | null) => void;
  placeholder: string;
  value?: DropdownOptions | null;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  styles?:
    | StylesConfig<DropdownOptions, false, GroupBase<DropdownOptions>>
    | undefined;
}

const defaultStyles = {
  container: (base: CSSObjectWithLabel) => ({
    ...base,
    minWidth: '180px',
    maxHeight: '34px',
  }),
  valueContainer: () => ({
    padding: '0px 0px 0px 5px',
    fontSize: '14px',
    maxHeight: '34px',
    display: 'flex',
    justifyContent: 'center',
  }),
  indicatorsContainer: () => ({
    height: '34px',
    display: 'flex',
    alignItems: 'center',
  }),
  dropdownIndicator: () => ({
    padding: '2px',
  }),
  placeholder: () => ({
    display: 'flex',
    alignItems: 'center',
  }),
  singleValue: () => ({
    display: 'flex',
    alignItems: 'center',
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    zIndex: 1000,
    width: '700px',
    minHeight: '300px',
  }),
  menuList: (base: CSSObjectWithLabel) => ({
    ...base,
    zIndex: 1000,
    width: '700px',
    minHeight: '300px',
  }),
  menuPortal: (base: CSSObjectWithLabel) => ({
    ...base,
    zIndex: 1000,
    width: '700px',
    minHeight: '300px',
  }),
};

function SelectWithAutocomplete({
  options,
  onChange,
  placeholder,
  value,
  isDisabled,
  isLoading,
  isSearchable,
  styles,
}: SelectWithAutocompleteProps) {
  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      isDisabled={isDisabled ?? false}
      isLoading={isLoading ?? false}
      isSearchable={isSearchable ?? true}
      styles={styles ?? defaultStyles}
      hideSelectedOptions
    />
  );
}

export default SelectWithAutocomplete;
