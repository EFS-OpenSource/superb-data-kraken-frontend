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

import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { produce } from 'immer';
import { BsPlus } from 'react-icons/bs';
import { filter } from 'lodash';
import { stringToLoadOptions } from '@utils/index';
import { Criteria, Filter, DropdownOptions } from '@customTypes/index';
import {
  Icon,
  searchButtonInfo,
  CustomButtonGroup,
  SelectWithAutocomplete,
} from '@components/index';

export interface SearchInputAdvancedProps {
  criteria: Criteria[] | undefined;
  data: string[];
  searchValue: string | undefined;
  onSetSearchValue: (searchValue: string | undefined) => void;
  onSetSelectFilters: (selectedFilters: (state: Filter[]) => Filter[]) => void;
  onReducedIndexAttributes: (remainingOptions: string[]) => void;
}

export function SearchInputAdvanced({
  criteria,
  data,
  searchValue,
  onSetSelectFilters,
  onReducedIndexAttributes,
  onSetSearchValue,
}: SearchInputAdvancedProps) {
  const { formatMessage } = useIntl();

  const [selectedIndexProperties, setSelectedIndexProperties] = useState<
    Criteria | undefined
  >(undefined);
  const [selectedOption, setSelectedOption] = useState<DropdownOptions | null>(
    null
  );
  const [inputType, setInputType] = useState<string>('text');
  const [operatorValue, setOperatorValue] = useState<string | null>('LIKE');
  const handlePropertyOptionClick = (
    selected: DropdownOptions | null
  ): void => {
    setSelectedOption(selected);
    if (criteria && selected) {
      const selectedProperties = criteria.find(
        (e: Criteria) => e.property === selected.value
      );
      setSelectedIndexProperties(selectedProperties);

      if (selectedProperties && selectedProperties.dataType === 'DATE') {
        setInputType('date');
      } else {
        setInputType('text');
      }
    }
  };

  const onOperatorClick = (newOperatorValue: string): void =>
    setOperatorValue(newOperatorValue);

  const disabled = (operator: string): boolean => {
    const isOperator = selectedIndexProperties?.operator.find(
      (e: string) => e === operator
    );
    if (!isOperator) {
      return true;
    }
    return false;
  };

  const handleAddChip = (
    newOperator: string,
    newProperty: string,
    value: string
  ): void => {
    const filters = produce<(state: Filter[]) => Filter[]>((draft) => {
      if (
        !draft.some(
          (filterOptions: Filter) =>
            filterOptions.value === value &&
            filterOptions.operator === newOperator &&
            filterOptions.property === newProperty
        )
      ) {
        draft.push({
          operator: newOperator,
          property: newProperty,
          value,
        });
      }
    });

    const isDateProperty = newProperty.toLowerCase().includes('date');

    if (!isDateProperty) {
      const updateIndexAttributes = filter(
        data,
        (item: string) => item !== selectedOption?.value
      );
      onReducedIndexAttributes(updateIndexAttributes);
    } else {
      onReducedIndexAttributes(data);
    }
    onSetSelectFilters(filters);
  };

  const addFilter = (): void => {
    if (operatorValue && searchValue && selectedIndexProperties) {
      handleAddChip(
        operatorValue,
        selectedIndexProperties.property,
        searchValue
      );

      setSelectedIndexProperties(undefined);
      setOperatorValue('LIKE');
      onSetSearchValue('');
      setSelectedOption(null);
    }
  };

  const handleKeyPress = (target: { charCode: number }): void => {
    if (target.charCode === 13) {
      addFilter();
    }
  };

  return (
    <Col
      xs={{ span: 12, offset: 0 }}
      className='p-0 m-0 d-flex justify-content-between'
    >
      <SelectWithAutocomplete
        options={stringToLoadOptions(data)}
        onChange={handlePropertyOptionClick}
        placeholder={formatMessage({
          id: 'Search.search-property',
        })}
        value={selectedOption}
        isDisabled={!data || data.length === 0}
        isLoading={!data || data.length === 0}
      />
      <CustomButtonGroup
        buttonInfo={searchButtonInfo}
        onClick={onOperatorClick}
        disabled={disabled}
      />
      <Row className='m-0 bg-white border border-middle rounded-lg p-0'>
        <Col xs={{ span: 10, offset: 0 }} className='px-1'>
          <Form.Control
            className='h-100 border border-white p-0 m-0 shadow-none'
            type={inputType}
            value={searchValue}
            onChange={(e) => onSetSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </Col>
        <Col
          xs={{ span: 1, offset: 0 }}
          className='p-0 m-0 d-flex align-items-center'
        >
          {operatorValue && selectedIndexProperties && searchValue && (
            <Icon
              icon={BsPlus}
              size={28}
              color='text-primary'
              type='button'
              onClick={addFilter}
            />
          )}
        </Col>
      </Row>
    </Col>
  );
}
