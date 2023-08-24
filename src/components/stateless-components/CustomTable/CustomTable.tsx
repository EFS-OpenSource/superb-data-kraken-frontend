import { useEffect, InputHTMLAttributes, useMemo, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { CustomButton, Icon } from '@components/index';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import { MdTableRows } from 'react-icons/md';
import { BiColumns } from 'react-icons/bi';
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import {
  PiCaretUpDownFill,
  PiCaretUpFill,
  PiCaretDownFill,
} from 'react-icons/pi';
import { useIntl } from 'react-intl';
import { wrap } from 'module';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

interface CustomTableProps<T extends object> {
  columns: ColumnDef<T, any>[];
  data: T[];
  rowCountValues?: number[];
  tableName: string;
  withPagination?: boolean;
  withTotalFilter?: boolean;
  withColumnFilter?: boolean;
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [firstValue, column.getFacetedUniqueValues],
  );

  const { formatMessage } = useIntl();
  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder="Min"
          maxLength={3}
          style={{
            width: '3.7rem',
            height: '.5rem',
            fontSize: '14px',
            display: 'inline-block',
          }}
          className="form-control form-control-sm rounded me-1"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder="Max"
          style={{
            width: '3.7rem',
            height: '.5rem',
            fontSize: '14px',
            display: 'inline-block',
          }}
          className="form-control form-control-sm rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={`${column.id}list`}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} aria-label="Search" />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        // placeholder="Search..."
        placeholder={`${formatMessage({
          id: 'Search.name-short',
        })}... (${column.getFacetedUniqueValues().size})`}
        className="form-control form-control-sm rounded w-auto"
        list={`${column.id}list`}
      />
      <div className="h-1" />
    </>
  );
}

interface DropdownRowCountProps {
  rowCountValues: number[];
  table: Table<any>;
}

const DropdownRowCount = ({
  rowCountValues,
  table,
}: DropdownRowCountProps): JSX.Element => (
  <Dropdown>
    <Dropdown.Toggle variant="secondary">
      <CustomButton
        size="sm"
        placementTooltip="bottom"
        icon={<Icon icon={MdTableRows} size={16} />}
        tooltipMessage="CustomTable.row-count"
        onClick={() => undefined}
      />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {rowCountValues.map((selectedPageSize) => (
        <Dropdown.Item
          key={selectedPageSize}
          active={selectedPageSize === table.getState().pagination.pageSize}
          onClick={() => {
            table.setPageSize(Number(selectedPageSize));
          }}
        >
          {selectedPageSize}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

const DropdownColumnSelect = ({ table }: { table: Table<any> }) => {
  const { formatMessage } = useIntl();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">
        <CustomButton
          size="sm"
          placementTooltip="bottom"
          icon={<Icon icon={BiColumns} size={16} />}
          tooltipMessage="CustomTable.column-select"
          onClick={() => undefined}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{
          maxHeight: '60vh',
          minWidth: '20rem',
          overflowX: 'hidden',
          overflowY: 'scroll',
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <input
            className="ms-3"
            {...{
              type: 'checkbox',

              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />{' '}
          {formatMessage({
            id: 'CustomTable.toggle-all',
          })}
        </label>
        <Dropdown.Divider />
        {table.getAllLeafColumns().map((column) => (
          <div key={column.id} id={column.id}>
            <input
              className="ms-3"
              {...{
                type: 'checkbox',
                checked: column.getIsVisible(),
                onChange: column.getToggleVisibilityHandler(),
              }}
            />{' '}
            {column.id}
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const CustomTable = <T extends object>({
  columns,
  data,
  rowCountValues = [5, 10, 25, 50, 100],
  tableName,
  withPagination = true,
  withTotalFilter = true,
  withColumnFilter = true,
}: CustomTableProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useLocalStorage(
    `${tableName}-columnStorage`,
    {},
  );

  const { formatMessage } = useIntl();

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      columnVisibility,
    },

    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className="px-10">
      <div>
        <Row className="d-flex mb-2 m-0 ">
          <Col className="pt-2">
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={(value) => setGlobalFilter(String(value))}
              className="form-control w-auto mb-2"
              placeholder={formatMessage({
                id: 'CustomTable.filter-all-columns',
              })}
            />
          </Col>

          <Col>
            <Container fluid className="d-flex justify-content-end p-0">
              <Row>
                <Col className="p-0 m-0">
                  <DropdownColumnSelect table={table} />
                </Col>
                <Col className="p-0 m-0">
                  <DropdownRowCount
                    rowCountValues={rowCountValues}
                    table={table}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
      <div className="h-2 p-0" />
      <Row className="table-wrapper">
        <table>
          <thead className="text-white bg-primary align-text-top">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none text-nowrap'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                            onKeyDown: (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                header.column.getToggleSortingHandler();
                              }
                            },
                            onKeyUp: (e) => {},
                            role: 'button',
                            tabIndex: 0,
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <Icon
                                icon={PiCaretUpFill}
                                size={16}
                                color="text-secondary"
                                type="button"
                              />
                            ),
                            desc: (
                              <Icon
                                icon={PiCaretDownFill}
                                size={16}
                                color="text-secondary"
                                type="button"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                          {/* eslint-disable-next-line no-nested-ternary */}
                          {header.column.getCanSort() ? (
                            header.column.getIsSorted() ? null : (
                              <Icon
                                icon={PiCaretUpDownFill}
                                size={16}
                                color="text-secondary"
                                type="button"
                              />
                            )
                          ) : null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div className="small text-nowrap">
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
      <br />
      <div className="h-2" />
      <div className="d-flex justify-content-center small">
        <div className="d-flex items-center gap-2">
          {table.getCanPreviousPage() && (
            <>
              <Icon
                icon={BsChevronDoubleLeft}
                size={16}
                color="text-primary"
                type="button"
                onClick={() => table.setPageIndex(0)}
              />
              <Icon
                icon={BsChevronLeft}
                size={16}
                color="text-primary"
                type="button"
                onClick={() => table.previousPage()}
              />
            </>
          )}
          <div className="d-flex justify-content-center ">
            <div className="d-flex items-center gap-2">
              <span className="flex items-center gap-1">
                {table.getPageCount() === 0
                  ? '0'
                  : table.getState().pagination.pageIndex + 1}{' '}
                {formatMessage({
                  id: 'CustomTable.paginator-text',
                })}{' '}
                {table.getPageCount()}
              </span>
            </div>
          </div>

          {table.getCanNextPage() && (
            <>
              <Icon
                icon={BsChevronRight}
                size={16}
                color="text-primary"
                type="button"
                onClick={() => table.nextPage()}
              />
              <Icon
                icon={BsChevronDoubleRight}
                size={16}
                color="text-primary"
                type="button"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              />
            </>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2 small">
        <span className="align-middle">
          {formatMessage({
            id: 'CustomTable.go-to-page',
          })}{' '}
          <input
            type="number"
            style={{ width: '4rem' }}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
      </div>
    </div>
  );
};

export default CustomTable;
