/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

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
  // sortingFns,
  getSortedRowModel,
  FilterFn,
  // SortingFn,
  ColumnDef,
  flexRender,
  // FilterFns,
} from '@tanstack/react-table';
import {
  RankingInfo,
  rankItem,
  // compareItems,
} from '@tanstack/match-sorter-utils';
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
import { useIntl } from 'react-intl';

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
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
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

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

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
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
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
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={`${column.id}list`}
      />
      <div className="h-1" />
    </>
  );
}

const CustomTable = <T extends object>({
  columns,
  data,
  rowCountValues = [5, 10, 25, 50, 100],
  withPagination = true,
  withTotalFilter = true,
  withColumnFilter = true,
}: CustomTableProps<T>) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnVisibility, setColumnVisibility] = React.useState({});
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

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const DropdownRowCount = (): JSX.Element => (
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

  DropdownRowCount.displayName = 'DropdownRowCount';

  // eslint-disable-next-line react/no-unstable-nested-components
  const DropdownColumnSelect = (): JSX.Element => (
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
          minWidth: '775px',
          overflowX: 'hidden',
          overflowY: 'scroll',
        }}
      >
        <Dropdown.Item>
          <input
            {...{
              type: 'checkbox',

              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />{' '}
          Toggle All
        </Dropdown.Item>
        <Dropdown.Divider />
        {table.getAllLeafColumns().map((column) => (
          <Dropdown.Item key={column.id} id={column.id}>
            <input
              {...{
                type: 'checkbox',
                checked: column.getIsVisible(),
                onChange: column.getToggleVisibilityHandler(),
              }}
            />{' '}
            {column.id}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  DropdownColumnSelect.displayName = 'DropdownColumnSelect';

  return (
    <div className="px-10">
      <Container fluid className="d-flex justify-content-end p-0">
        <Row className="d-flex mb-2 m-0 ">
          <Col className="p-0 m-0">
            <DropdownColumnSelect />
          </Col>
          <Col className="p-0 m-0">
            <DropdownRowCount />
          </Col>
        </Row>
      </Container>

      <div>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <div className="h-2" />
      <table>
        <thead className="text-white bg-primary font-weight-medium">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
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
                          asc: ' ▲',
                          desc: ' ▼',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div className="small">
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
