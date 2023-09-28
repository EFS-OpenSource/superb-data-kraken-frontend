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

import { useEffect, useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import { createColumnHelper } from '@tanstack/react-table';
import { Row, Col, Container } from 'react-bootstrap';
import {
  CustomTable,
  InputChipField,
  MeasurementInfoOverlay,
} from '@components/index';
import {
  Criteria,
  Filter,
  MeasurementIndex,
  Organization,
  Space,
  MassData,
} from '@customTypes/index';
import {
  getMetaData,
  getFilterCriteria,
  getResultProperties,
} from '@services/index';
import { ErrorToast } from '@notifications/index';
import { SearchInputBasic } from './SearchBar/SearchInputBasic';
import { SearchBar } from './SearchBar/SearchBar';
import { SearchInputAdvanced } from './SearchBar/SearchInputAdvanced';

interface SearchAppProps {
  orgData?: Organization;
  spaceData?: Space;
}

const columnHelper = createColumnHelper<MeasurementIndex>();

function SearchApp({ orgData, spaceData }: SearchAppProps) {
  const isMounted = useRef(false);
  const { formatMessage } = useIntl();

  // Initial setup for index name based on orgData & spaceData.
  // TODO Async await - orgdata not available on reload
  const assembleIndexName = (): string => {
    if (orgData && !spaceData) {
      return (
        `${orgData.name}_.*_${process.env.VITE_INDEX_NAME}` ?? 'measurements'
      ); /* TODO .* only aplicable on criteria endpoint and in current Backend version, will be changed in the future */
    }

    if (orgData && spaceData) {
      if (
        spaceData.metadataIndexName &&
        spaceData.metadataIndexName.length > 0
      ) {
        return spaceData.metadataIndexName;
      }
      return (
        `${orgData.name}_${spaceData.name}_${process.env.VITE_INDEX_NAME}` ??
        'measurements'
      );
    }
    return process.env.VITE_INDEX_NAME ?? 'measurements';
  };

  const [indexName, setIndexName] = useState<string>(
    process.env.VITE_INDEX_NAME ?? 'measurements',
  );
  useEffect(() => {
    setIndexName(assembleIndexName());
  }, [orgData, spaceData]);

  const [indexAttributes, setIndexAttributes] = useState<string[]>([]);
  const [reducedIndexAttributes, setReducedIndexAttributes] = useState<
    string[]
  >([]);
  const [criteria, setCriteria] = useState<Criteria[]>();
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [tableData, setTableData] = useState<MeasurementIndex[]>([]);
  const [columnData, setColumnData] = useState<any>([]);
  const [hitCount, setHitCount] = useState<number | undefined>();
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [dataOverlayComponent, setDataOverlayComponent] = useState<
    MeasurementIndex | undefined
  >();
  const [searchDuration, setSearchDuration] = useState<number | undefined>(
    undefined,
  );
  const [defaultColumnsVisibility, setDefaultColumnsVisibility] = useState({});
  const [isAdvancedSearchActive, setIsAdvancedSearchActive] = useState(false);

  // Building the columns from the resultProperties endpoint
  const createColumns = () => {
    getResultProperties(indexName).then((response) => {
      if (response.ok) {
        const columnNames = response.data.sort();
        const defaultColumns = process.env.VITE_CONFIG_SEARCH_COLUMNS
          ? process.env.VITE_CONFIG_SEARCH_COLUMNS.split(',')
          : [
              'name',
              'project.name',
              'scope.name',
              'caseSpecification.description',
            ];

        const columnsVisibility: Record<string, boolean> = {};

        const displayedItems = 3;
        columnNames.forEach((columnName: string) => {
          columnsVisibility[columnName] = defaultColumns.includes(columnName);
        });
        setDefaultColumnsVisibility(columnsVisibility);

        const columns = columnNames.map((columnName: string) => {
          if (columnName.startsWith('massdata')) {
            return columnHelper.accessor('massdata', {
              id: columnName,
              header: (props) => props.column.id,

              // eslint-disable-next-line react/no-unstable-nested-components
              cell: (info) => {
                const massdataArray = info.row.original.massdata || [];
                const key = columnName.split('.').pop();
                let cellContent: JSX.Element[] = [];

                if (key) {
                  cellContent = massdataArray
                    .slice(0, displayedItems)
                    .map((item) => <div>{item[key as keyof MassData]}</div>);
                }

                const remainingItems = massdataArray.length - displayedItems;

                if (remainingItems > 0) {
                  cellContent.push(
                    <div key="more-items" className="fst-italic small">
                      <br />
                      {formatMessage(
                        {
                          id: 'Search.more-items',
                        },
                        { remainingItems },
                      )}
                    </div>,
                  );
                }

                return <div>{cellContent}</div>;
              },

              filterFn: 'massdata',
            });
          }

          return columnHelper.accessor(columnName as any, {
            id: columnName,
            header: (props) => props.column.id,
            cell: (info) => info.getValue(),
          });
        });
        setColumnData(columns);
      } else
        ErrorToast(
          'ErrorToast.title',
          response.status,
          response.statusText,
          response.data.errorCode,
        );
    });
  };

  const onSubmit = (event?: React.SyntheticEvent): void => {
    event?.preventDefault();
    const queryInput = {
      index_name: indexName.replace(
        '.',
        '',
      ) /* TODO remove, when implementation in Backend is updated */,
      resultProperties: [],
      filter: selectedFilters,
    };

    getMetaData(queryInput).then((response) => {
      if (response.ok) {
        createColumns();
        setTableData(response.data.hits);
        setHitCount(response.data.max);
        setSearchDuration(response.data.duration);
      } else
        ErrorToast(
          'ErrorToast.title',
          response.status,
          response.statusText,
          response.data.errorCode,
        );
    });
  };

  // Fetch filter criteria / columnnames on component mount.
  useEffect(() => {
    if (isAdvancedSearchActive && !criteria) {
      getFilterCriteria(indexName).then((response) => {
        if (response.ok) {
          const options: string[] = [];
          response.data.map((result: Criteria) =>
            options.push(result.property),
          );
          const sortedOptions = options.sort();
          setIndexAttributes(sortedOptions);
          setReducedIndexAttributes(sortedOptions);
          setCriteria(response.data);
        } else
          ErrorToast(
            'ErrorToast.title',
            response.status,
            response.statusText,
            response.data.errorCode,
          );
      });
    }
  }, [criteria, indexName, isAdvancedSearchActive]);

  // Fetch metadata when selected filters or other dependencies change.
  useEffect(() => {
    if (
      isMounted.current &&
      searchValue !== undefined &&
      selectedFilters.length > 0
    ) {
      onSubmit();
    }
    isMounted.current = true;
  }, [selectedFilters]);

  return (
    <div className="my-6">
      {dataOverlayComponent ? (
        <Container fluid className="p-0 flex-row h-100">
          <Row>
            <Col
              xl={{ span: 10, offset: 1 }}
              xs={{ span: 12, offset: 0 }}
              className="px-0"
            >
              <MeasurementInfoOverlay
                data={dataOverlayComponent}
                onOverlayToggler={setDataOverlayComponent}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid className="p-0 flex-row h-100">
          <Row className="mx-0">
            <SearchBar
              searchInputBasic={
                <SearchInputBasic
                  searchValue={searchValue}
                  onSetSearchValue={setSearchValue}
                  onSetSelectFilters={setSelectedFilters}
                />
              }
              searchInputAdvanced={
                <SearchInputAdvanced
                  criteria={criteria}
                  data={reducedIndexAttributes}
                  searchValue={searchValue}
                  onSetSearchValue={setSearchValue}
                  onSetSelectFilters={setSelectedFilters}
                  onReducedIndexAttributes={setReducedIndexAttributes}
                />
              }
              hitCount={hitCount}
              onSetSelectFilters={setSelectedFilters}
              onSetSearchValue={setSearchValue}
              searchDuration={searchDuration}
              onSetTableData={setTableData}
              onSetHitCount={setHitCount}
              onAdvancedModeChange={(isActive) =>
                setIsAdvancedSearchActive(isActive)
              }
            />
          </Row>

          {selectedFilters.length > 0 &&
            selectedFilters[0].property !== '_all_fields' && (
              <Row className="m-0">
                <Col
                  xl={{ span: 8, offset: 2 }}
                  xs={{ span: 12, offset: 0 }}
                  className="my-4 p-0"
                >
                  <InputChipField
                    selectedFilters={selectedFilters}
                    indexAttributes={indexAttributes}
                    reducedIndexAttributes={reducedIndexAttributes}
                    onSelectedFilters={setSelectedFilters}
                    onReducedIndexAttributes={setReducedIndexAttributes}
                    onSetTableData={setTableData}
                    onSetHitCount={setHitCount}
                  />
                </Col>
              </Row>
            )}
          {hitCount && hitCount !== 0 ? (
            <Row className="mx-0 mt-3 mb-6">
              <Col
                xl={{ span: 10, offset: 1 }}
                xs={{ span: 12, offset: 0 }}
                className="px-0"
              >
                <CustomTable
                  data={tableData}
                  columns={columnData}
                  defaultColumnsVisibility={defaultColumnsVisibility}
                  tableName="searchapp"
                  overlayComponent
                  onDataOverlayComponent={setDataOverlayComponent}
                  showColumnsFiltering
                />
              </Col>
            </Row>
          ) : undefined}
        </Container>
      )}
    </div>
  );
}

export default SearchApp;
