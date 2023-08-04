import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import simpleData from '@assets/mockData/simpleData.json';
import { useMemo } from 'react';

type SimpleData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  dob: string;
};

const columnHelper = createColumnHelper<SimpleData>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
    footer: 'ID',
  }),
  columnHelper.accessor('first_name', {
    header: 'First Name',
    cell: (info) => info.getValue(),
    footer: 'ID',
  }),
  columnHelper.accessor('last_name', {
    header: 'Last Name',
    cell: (info) => info.getValue(),
    footer: 'Last Name',
  }),
  columnHelper.accessor('email', {
    header: 'E-Mail',
    cell: (info) => info.getValue(),
    footer: 'E-Mail',
  }),
  columnHelper.accessor('gender', {
    header: 'Gender',
    cell: (info) => info.getValue(),
    footer: 'Gender',
  }),
  columnHelper.accessor('dob', {
    header: 'Date of Birth',
    cell: (info) => info.getValue(),
    footer: 'Date of Birth',
  }),
];

function BasicTable() {
  const data = useMemo(() => simpleData, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <div>BasicTable</div>;
}

export default BasicTable;
