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
import { Col, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { IoOptionsSharp } from 'react-icons/io5';
import { Filter, MeasurementIndex } from '@customTypes/index';
import { CustomButton, Icon } from '@components/index';

export interface SeachBarProps {
  searchInputBasic: JSX.Element;
  searchInputAdvanced: JSX.Element;
  onSetSelectFilters: (filter: Filter[]) => void;
  hitCount: number | undefined;
  searchDuration: number | undefined;
  onSetHitCount: (hitCount: number | undefined) => void;
  onSetTableData: (tableData: MeasurementIndex[]) => void;
  onSetSearchValue: (searchValue: string | undefined) => void;
  onAdvancedModeChange?: (isActive: boolean) => void;
}

export function SearchBar({
  searchInputBasic,
  searchInputAdvanced,
  onSetSelectFilters,
  hitCount,
  searchDuration,
  onSetHitCount,
  onSetTableData,
  onSetSearchValue,
  onAdvancedModeChange,
}: SeachBarProps) {
  const { formatMessage } = useIntl();
  const [advancedMode, setAdvancedMode] = useState<boolean>(false);

  const handleToggler = (): void => {
    setAdvancedMode((prev) => !prev);
    onSetSelectFilters([]);
    onSetTableData([]);
    onSetHitCount(undefined);
    onSetSearchValue(undefined);

    if (onAdvancedModeChange) {
      onAdvancedModeChange(!advancedMode);
    }
  };

  return (
    <Col
      xl={{ span: 8, offset: 2 }}
      xs={{ span: 12, offset: 0 }}
      className={
        hitCount !== undefined
          ? 'px-5 pt-4 pb-2 bg-light rounded-lg'
          : 'px-5 py-4 bg-light rounded-lg'
      }
    >
      <Row>
        <Col
          xs={{ span: 11, offset: 0 }}
          className={
            advancedMode
              ? 'p-0 m-0'
              : 'd-flex p-0 m-0 bg-white align-items-center'
          }
        >
          {!advancedMode ? searchInputBasic : searchInputAdvanced}
        </Col>
        <Col xs={{ span: 1, offset: 0 }} className="p-0 m-0 text-center">
          <CustomButton
            size="sm"
            placementTooltip="top"
            icon={<Icon icon={IoOptionsSharp} size={20} />}
            onClick={handleToggler}
            tooltipMessage="Search.search-bar-filter-button"
          />
        </Col>
      </Row>
      {hitCount !== undefined && searchDuration && (
        <Row>
          <h6 className="mt-1 mb-0 text-dark">
            {hitCount.toString()}
            {formatMessage({
              id: 'SearchBar.search-result-count',
            })}
            (~ {searchDuration / 1000}
            {formatMessage({
              id: 'SearchBar.search-result-duration',
            })}
            )
          </h6>
        </Row>
      )}
    </Col>
  );
}
