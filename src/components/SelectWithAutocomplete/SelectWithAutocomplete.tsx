import { FC } from 'react';
import Select from 'react-select';
import { DropdownOptions } from '@customTypes/index';

export interface SelectWithAutocompleteProps {
  options: DropdownOptions[];
  onChange: (value: DropdownOptions | null) => void;
  placeholder: string;
  value: DropdownOptions | null;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  styles?: any;
}

const defaultStyles = {
  container: (base: any) => ({
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
  menu: (base: any) => ({
    ...base,
    zIndex: 1000,
    width: '700px',
    minHeight: '300px',
  }),
  menuList: (base: any) => ({
    ...base,
    zIndex: 1000,
    width: '700px',
    minHeight: '300px',
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 1000,
    width: '700px',
    minHeight: '300px',
  }),
};

const SelectWithAutocomplete: FC<SelectWithAutocompleteProps> = ({
  options,
  onChange,
  placeholder,
  value,
  isDisabled,
  isLoading,
  isSearchable,
  styles,
}) => (
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

export default SelectWithAutocomplete;
