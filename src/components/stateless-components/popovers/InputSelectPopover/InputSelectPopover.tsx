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

import { useRef, useState, CSSProperties } from 'react';
import { Icon, SelectWithAutocomplete } from '@components/index';
import {
  DropdownOptions,
  UserOrgaRoleType,
  UserSpaceRoleType,
} from '@customTypes/index';
import { Button, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { Placement } from 'node_modules/@restart/ui/esm/usePopper';
import { StylesConfig, GroupBase } from 'react-select';

interface InputSelectPopoverType {
  id: string;
  placement: Placement;
  buttonLabel: string;
  popoverOpenButton: JSX.Element;
  dropdownOptions: readonly string[];
  handleShow: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  headline?: string;
  style?: CSSProperties;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputValue?: string;
  disabled?: boolean;
  onSend?: (dropdownOption: any, inputText?: string) => void;
  // properties for SelectWithAutocomplete
  selectOptions?: DropdownOptions[];
  selectValue?: string;
  selectPlaceholder?: string;
  selectPlaceholder2?: string;
  selectIsSearchable?: boolean;
  onChange?: any;
  selectStyles?:
    | StylesConfig<DropdownOptions, false, GroupBase<DropdownOptions>>
    | undefined;
  noOptionsMessage?: string;
}

function InputSelectPopover({
  id,
  placement,
  style,
  headline,
  inputLabel,
  inputPlaceholder,
  inputValue,
  disabled,
  buttonLabel,
  popoverOpenButton,
  handleShow,
  onSend,
  dropdownOptions,
  selectOptions,
  selectValue,
  selectPlaceholder,
  selectPlaceholder2,
  selectIsSearchable,
  onChange,
  selectStyles,
  noOptionsMessage,
}: InputSelectPopoverType) {
  const [show, setShow] = useState(false);

  const popoverContainer = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setShow(false);
  };

  const [dropdownOption, setDropdownOption] = useState<
    UserSpaceRoleType | UserOrgaRoleType
  >();

  const onRoleSelectHandler = (e: DropdownOptions | null) => {
    setDropdownOption(e as unknown as UserSpaceRoleType | UserOrgaRoleType);
  };

  const [inputText, setInputText] = useState(inputValue || '');

  const dropdownOptionsForReactSelect = dropdownOptions.map((option) => ({
    label: option,
    value: option,
  }));

  const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddData = () => {
    let dataToSend;

    if (inputText !== undefined && dropdownOption) {
      dataToSend = {
        inputText,
        dropdownOption,
      };
      if (onSend && inputText) {
        onSend(dataToSend.dropdownOption, dataToSend.inputText);
        setInputText('');
        setDropdownOption(dropdownOptions.includes('user') ? 'user' : 'access');
      }
    }

    if (selectValue !== undefined && dropdownOption) {
      dataToSend = {
        selectValue,
        dropdownOption,
      };
      if (onSend && selectValue) {
        onSend(dataToSend.dropdownOption, dataToSend.selectValue);
        setDropdownOption(dropdownOptions.includes('user') ? 'user' : 'access');
      }
    }

    if ((!selectValue && dropdownOption) || (!inputText && dropdownOption)) {
      dataToSend = {
        dropdownOption,
      };
      if (onSend) {
        onSend(dropdownOption);
        setDropdownOption(dropdownOptions.includes('user') ? 'user' : 'access');
      }
    }

    setShow(false);
  };

  return (
    <OverlayTrigger
      placement={placement}
      trigger='click'
      show={show}
      onToggle={setShow}
      transition={false}
      rootClose
      container={popoverContainer}
      overlay={
        <Popover id={id} style={style} onClick={handleShow}>
          <Popover.Body>
            <Col className='d-flex justify-content-between m-0 px-4'>
              <div className='font-weight-bold my-2'>{headline}</div>

              <Icon
                ariaLabel={`close-${id}`}
                type='button'
                icon={IoClose}
                size={24}
                onClick={handleClose}
              />
            </Col>
            {inputLabel && (
              <Col className='d-flex justify-content-between m-0 px-4'>
                <small>
                  <strong>{inputLabel}</strong>
                </small>
              </Col>
            )}
            <Col className='d-flex justify-content-between m-0 px-4'>
              {selectOptions && selectOptions.length < 1 && (
                <input
                  type='text'
                  value={inputValue}
                  placeholder={inputPlaceholder}
                  disabled={disabled}
                  onChange={(e) => onChangeNameHandler(e)}
                />
              )}
              {selectOptions && selectOptions.length > 0 && (
                <SelectWithAutocomplete
                  options={selectOptions}
                  placeholder={selectPlaceholder || ''}
                  onChange={onChange}
                  isSearchable={selectIsSearchable}
                  selectStyles={selectStyles}
                  noOptionsMessage={noOptionsMessage}
                />
              )}
              <SelectWithAutocomplete
                options={dropdownOptionsForReactSelect as DropdownOptions[]}
                placeholder={selectPlaceholder2 || ''}
                onChange={(e) => onRoleSelectHandler(e)}
                isSearchable={selectIsSearchable}
                selectStyles={selectStyles}
                noOptionsMessage={noOptionsMessage}
              />
              <Button
                aria-label={`${id}-addButton`}
                variant='primary'
                className='p-1 px-2'
                onClick={handleAddData}
              >
                {buttonLabel}
              </Button>
            </Col>
          </Popover.Body>
        </Popover>
      }
    >
      <div ref={popoverContainer}>{popoverOpenButton}</div>
    </OverlayTrigger>
  );
}

export default InputSelectPopover;
