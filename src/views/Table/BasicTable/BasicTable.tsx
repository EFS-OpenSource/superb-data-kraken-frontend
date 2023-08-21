import { createColumnHelper } from '@tanstack/react-table';
import simpleData from '@assets/mockData/simpleData.json';
import { CustomTable } from '@components/index';
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

const BasicTable = () => {
  const columns = useMemo(
    () => [
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
        enableSorting: false,
      }),
      columnHelper.accessor('dob', {
        header: 'Date of Birth',
        cell: (info) => info.getValue(),
        footer: 'Date of Birth',
        enableColumnFilter: false,
      }),
    ],
    [],
  );

  return <CustomTable<SimpleData> columns={columns} data={simpleData} />;
};

// function BasicTable() {
//   const [data, setData] = useState<SimpleData[]>(simpleData);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div>
//       <Row className="table-wrapper">
//         <table>
//           <thead className="text-white bg-primary font-weight-medium">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Row>
//     </div>
//   );
// }

export default BasicTable;
