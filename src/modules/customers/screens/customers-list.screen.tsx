import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { pathsNavigation } from "../../../resources/routes/paths-navigation.routes";

const data = [{ id: 1, name: "Ada", mobile: "7690903270" }];
const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "mobile", header: "Mobile" },
];

function CustomersListScreen() {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className="bg-base-100  shadow-sm p-2 rounded-lg flex items-center justify-end">
        <div className="">
          <Link
            className="btn btn-primary text-white"
            to={pathsNavigation.customers_paths.registerCustomer}
          >
            Register Customer
          </Link>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto h-96 z-auto mt-10">
          <table className="table table-pin-rows">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CustomersListScreen;
