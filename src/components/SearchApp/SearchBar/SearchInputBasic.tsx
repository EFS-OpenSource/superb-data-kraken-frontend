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

import { Col, Form } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { Filter } from '@customTypes/index';
import { Icon } from '@components/index';

export interface SearchInputBasicProps {
  searchValue: string | undefined;
  onSetSelectFilters: (filterAllFieds: Filter[]) => void;
  onSetSearchValue: (searchValue: string | undefined) => void;
}

export function SearchInputBasic({
  searchValue,
  onSetSelectFilters,
  onSetSearchValue,
}: SearchInputBasicProps) {
  const filterAllFieds = [
    {
      operator: 'LIKE',
      property: '_all_fields',
      value: searchValue,
    },
  ];

  const handleKeyPress = (target: { charCode: number }): void => {
    if (target.charCode === 13 && searchValue) {
      onSetSelectFilters(filterAllFieds);
    }
  };

  const handleSearchButton = () => {
    onSetSelectFilters(filterAllFieds);
  };

  return (
    <Col
      xs={{ span: 12, offset: 0 }}
      className="border border-white rounded-lg pl-1 pr-2 d-flex justify-content-between align-items-center"
    >
      <Form.Control
        className="h-100 border border-white p-0 pl-2 shadow-none"
        onChange={(event: { target: { value: string } }) => {
          onSetSearchValue(event.target.value);
        }}
        onKeyPress={(event: { charCode: number }) => {
          handleKeyPress(event);
        }}
      />
      <Icon
        icon={BsSearch}
        size={20}
        color="text-primary"
        type="button"
        onClick={handleSearchButton}
      />
    </Col>
  );
}
