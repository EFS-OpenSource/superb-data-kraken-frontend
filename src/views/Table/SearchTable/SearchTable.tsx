import { createColumnHelper } from '@tanstack/react-table';
import searchData from '@assets/mockData/searchTable.json';
import { CustomTable } from '@components/index';
import { useMemo } from 'react';

type SearchData = {
  massdata: {
    dateCreated: string;
    date_created: string;
    location: string;
    name: string;
    size: number;
  };
  metadata: {
    dateTime: {
      createdAt: string;
    };
    description: string;
    environment: {
      name: string;
    };
    name: string;
    project: {
      confidentiality: string;
      name: string;
      purpose: string;
      type: string;
    };
    scope: {
      confidentiality: string;
      name: string;
      purpose: string;
    };
  };
  organization: string;
  space: string;
  uuid: string;
};

const columnHelper = createColumnHelper<SearchData>();

const SearchTable = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('massdata.dateCreated', {
        header: 'mass.dateCreated',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('massdata.date_created', {
        header: 'mass.date_created',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('massdata.location', {
        header: 'mass.location',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('massdata.name', {
        header: 'mass.name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('massdata.size', {
        header: 'mass.size',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.dateTime.createdAt', {
        header: 'meta.dateTime.createdAt',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.description', {
        header: 'meta.description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.environment.name', {
        header: 'meta.environment.name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.name', {
        header: 'meta.name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.project.confidentiality', {
        header: 'meta.project.confidentiality',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.project.name', {
        header: 'meta.project.name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.project.purpose', {
        header: 'meta.project.purpose',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.project.type', {
        header: 'meta.project.type',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.scope.confidentiality', {
        header: 'meta.scope.confidentiality',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.scope.name', {
        header: 'meta.scope.name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('metadata.scope.purpose', {
        header: 'meta.scope.purpose',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('organization', {
        header: 'organization',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('space', {
        header: 'space',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('uuid', {
        header: 'uuid',
        cell: (info) => info.getValue(),
      }),
    ],
    [],
  );

  return (
    <CustomTable<SearchData>
      columns={columns}
      data={searchData}
      tableName="sampleSearch"
    />
  );
};

export default SearchTable;
