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

import { Col, Row } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { produce } from 'immer';
import { sortBy } from 'lodash';
import { Icon, Chip } from '@components/index';
import { IoClose } from 'react-icons/io5';
import { MeasurementIndex, Filter } from '@customTypes/index';

export interface InputChipFieldProps {
  selectedFilters: Filter[];
  indexAttributes: string[];
  reducedIndexAttributes: string[];
  onSelectedFilters: (selectedFilters: Filter[]) => void;
  onReducedIndexAttributes: (updatedPropOptions: string[]) => void;
  onSetTableData: (tableData: MeasurementIndex[]) => void;
  onSetHitCount: (hitCount: number | undefined) => void;
}

function InputChipField({
  selectedFilters,
  indexAttributes,
  reducedIndexAttributes,
  onSelectedFilters,
  onReducedIndexAttributes,
  onSetTableData,
  onSetHitCount,
}: InputChipFieldProps) {
  const removeAllInputChips = (): void => {
    onSelectedFilters([]);
    onReducedIndexAttributes(indexAttributes);
    onSetTableData([]);
    onSetHitCount(undefined);
  };
  const handleDeleteChip = (
    property: string,
    operator: string,
    value: string | undefined,
  ): void => {
    const reducedSelectedFilterOptions = selectedFilters.filter(
      (options) =>
        options.value !== value ||
        options.property !== property ||
        options.operator !== operator,
    );

    const updateIndexAttributes = sortBy(
      produce(reducedIndexAttributes, (draft) => {
        draft.push(property);
      }),
      [(item: string) => item],
    );

    onSelectedFilters(reducedSelectedFilterOptions);
    onReducedIndexAttributes(updateIndexAttributes);

    if (reducedSelectedFilterOptions.length === 0) {
      removeAllInputChips();
    }
  };

  return (
    <Row className="m-0 align-items-center">
      <Col xs={11} className="p-0 d-flex flex-wrap">
        {selectedFilters.map((filterOptions) => (
          <div key={nanoid()} className="mr-3 my-2">
            <Chip
              ariaLabel="search-chip"
              key={`${
                filterOptions.property
              } ${filterOptions.operator.toLowerCase()} ${filterOptions.value}`}
              text={`${
                filterOptions.property
              } ${filterOptions.operator.toLowerCase()} ${filterOptions.value}`}
              icon={
                <Icon
                  ariaLabel="deleteAddEditModalTag"
                  icon={IoClose}
                  type="button"
                  color="text-light"
                  size={16}
                  onClick={() =>
                    handleDeleteChip(
                      filterOptions.property,
                      filterOptions.operator,
                      filterOptions.value,
                    )
                  }
                />
              }
              activeColor="accent"
              size="sm"
            />
          </div>
        ))}
      </Col>
      <Col xs={1} className="p-0 text-center">
        <BsX
          size={32}
          role="button"
          className="btn btn-secondary disabled p-0 m-0"
          onClick={removeAllInputChips}
        />
      </Col>
    </Row>
  );
}

export default InputChipField;
