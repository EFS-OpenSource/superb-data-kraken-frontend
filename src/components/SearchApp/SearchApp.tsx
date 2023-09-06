import {
  SyntheticEvent,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Row, Col, Container } from 'react-bootstrap';
import {
  CustomTable,
  InputChipField,
  MeasurementInfoOverlay,
} from '@components/index';
import {
  Criteria,
  Filter,
  ColumnTypeSearch,
  MeasurementIndex,
  Organization,
  Space,
  SearchColumns,
  MassData,
  Metadata,
} from '@customTypes/index';
import { getMetaData, getFilterCriteria } from '@services/index';
import { ErrorToast } from '@notifications/index';
import { useIntl } from 'react-intl';
/* temporary solution from f/847-sdk-suchoberflaeche-fuer-aicloud */
import { DefaultColumnsSearch } from './configInitialColumns';
import { SearchInputBasic } from './SearchBar/SearchInputBasic';
import { SearchBar } from './SearchBar/SearchBar';
import { SearchInputAdvanced } from './SearchBar/SearchInputAdvanced';

interface SearchAppProps {
  orgData?: Organization;
  spaceData?: Space;
}

const columnHelper = createColumnHelper<MeasurementIndex>();

const SearchApp: React.FC<SearchAppProps> = ({ orgData, spaceData }) => {
  const isMounted = useRef(false);

  // Initial setup for index name based on orgData & spaceData.
  /* TODO Async await - orgdata not available on reload
const { data: orgaData } = useQuery(['organization', orgID], () => {
        if (orgID) {
            return getOrganization(orgID)
        }

        return null
    })

  */
  const assembleIndexName = (): string => {
    if (!orgData && !spaceData) {
      return process.env.VITE_INDEX_NAME ?? 'measurements';
    }
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

  const [indexName] = useState<string>(assembleIndexName());
  const [indexAttributes, setIndexAttributes] = useState<string[]>([]);
  const [reducedIndexAttributes, setReducedIndexAttributes] = useState<
    string[]
  >([]);
  const [criteria, setCriteria] = useState<Criteria[]>();
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [tableData, setTableData] = useState<MeasurementIndex[]>([]);
  const [columnData, setColumnData] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setpageCount] = useState<number>(1);
  const [hitCount, setHitCount] = useState<number | undefined>();
  const rowCountValues = [10, 25, 50, 100];
  const [rowCount, setRowCount] = useState<number>(rowCountValues[1]);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [dataOverlayComponent, setDataOverlayComponent] = useState<
    MeasurementIndex | undefined
  >();
  const [searchDuration, setSearchDuration] = useState<number | undefined>(
    undefined,
  );
  const [defaultColumnsVisibility, setDefaultColumnsVisibility] = useState({});

  const onSubmit = (event?: React.SyntheticEvent): void => {
    event?.preventDefault();

    const queryInput = {
      index_name: indexName.replace(
        '.',
        '',
      ) /* TODO remove, when implementation in Backend is updated */,
      page: currentPage,
      size: rowCount,
      resultProperties: [],
      filter: selectedFilters,
    };

    getMetaData(queryInput).then((response) => {
      if (response.ok) {
        setTableData(response.data.hits);
        setHitCount(response.data.max);
        setSearchDuration(response.data.duration);
        setCurrentPage(response.data.page);
        setpageCount(Math.ceil(response.data.max / response.data.size));
      } else
        ErrorToast(
          'ErrorToast.title',
          response.status,
          response.statusText,
          response.data.errorCode,
        );
    });
  };

  // Fetch filter criteria on component mount.
  useEffect(() => {
    console.log(`IndexName: ${indexName}`);
    getFilterCriteria(indexName).then((response) => {
      if (response.ok) {
        const options: string[] = [];
        response.data.map((result: Criteria) => options.push(result.property));
        setIndexAttributes(options);
        setReducedIndexAttributes(options);
        setCriteria(response.data);

        // Define default columns based on env variable or a default set.
        const defaultColumns = process.env.VITE_CONFIG_SEARCH_COLUMNS
          ? process.env.VITE_CONFIG_SEARCH_COLUMNS.split(',')
          : [
              'name',
              'project.name',
              'scope.name',
              'caseSpecification.description',
            ];

        const newColumnsVisibility: Record<string, boolean> = {};

        options.forEach((columnName) => {
          newColumnsVisibility[columnName] =
            defaultColumns.includes(columnName);
        });
        console.log(`NewCV: ${newColumnsVisibility}`);

        setDefaultColumnsVisibility(newColumnsVisibility);

        console.log(reducedIndexAttributes);

        const columns = options.map((option) => {
          if (option.startsWith('massdata')) {
            return columnHelper.accessor('massdata', {
              id: option,
              header: (props) => props.column.id,
              cell: (info) => {
                const massdataArray = info.row.original.massdata;
                const key = option.split('.').pop();
                return key
                  ? massdataArray
                      .map((item) => item[key as keyof MassData])
                      .join('\n')
                  : '';
              },
            });
          }
          return columnHelper.accessor(option as any, {
            id: option,
            header: (props) => props.column.id,
            cell: (info) => info.getValue(),
          });
        });
        console.log(`columns: ${columns}`);
        setColumnData(columns);
      } else
        ErrorToast(
          'ErrorToast.title',
          response.status,
          response.statusText,
          response.data.errorCode,
        );
    });
  }, [indexName]);

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
  }, [selectedFilters, rowCount, currentPage]);

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
                  onSetCurrentPage={setCurrentPage}
                />
              }
              searchInputAdvanced={
                <SearchInputAdvanced
                  criteria={criteria}
                  data={reducedIndexAttributes}
                  searchValue={searchValue}
                  onSetSearchValue={setSearchValue}
                  onSetCurrentPage={setCurrentPage}
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
                    onSetCurrentPage={setCurrentPage}
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
                />
              </Col>
            </Row>
          ) : undefined}
        </Container>
      )}
    </div>
  );
};

export default SearchApp;
