/* eslint-disable react-hooks/incompatible-library */
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

import { getAssignedCustomers } from "../services/customers.services";
import type { ICustomer } from "../models/customers.models";
import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";

function CustomersListComponents() {
  const [data, setData] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const customers = await getAssignedCustomers();
      setData(customers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    {
      header: "S.No",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => row.index + 1,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "created_at", header: "Created" },

    {
      header: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const customer = row.original;

        return (
          <div className="flex gap-2">
            <button
              className="btn btn-xs sm:btn-sm btn-primary"
              onClick={() =>
                navigate(
                  `${navigate_paths.customers_paths.customerDetails}/${customer.id}`,
                )
              }
            >
              View
            </button>

            <button className="btn btn-xs sm:btn-sm btn-warning">Edit</button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 🔄 Loading
  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="mt-10 px-4">
        <div className="alert alert-error shadow-lg">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 px-4">
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-lg border border-base-200">
          <table className="table table-zebra">
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

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {data.map((customer, index) => (
          <div key={customer.id} className="card bg-base-100 shadow border">
            <div className="card-body p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">
                  {index + 1}. {customer.name}
                </h2>
                <div className="badge badge-outline">ID: {customer.id}</div>
              </div>

              <p className="text-sm">
                📧 <span className="font-medium">Email:</span>{" "}
                {customer.email || "N/A"}
              </p>

              <p className="text-sm">
                📞 <span className="font-medium">Phone:</span> {customer.phone}
              </p>

              <p className="text-sm">
                📍 <span className="font-medium">Address:</span>{" "}
                {customer.address}
              </p>

              <p className="text-xs text-gray-500">
                Created: {new Date(customer.created_at).toLocaleString()}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  className="btn btn-xs btn-primary flex-1"
                  onClick={() =>
                    navigate(
                      `${navigate_paths.customers_paths.customerDetails}/${customer.id}`,
                    )
                  }
                >
                  View
                </button>

                <button className="btn btn-xs btn-warning flex-1">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center mt-6 text-gray-500">No customers found</div>
      )}
    </div>
  );
}

export default CustomersListComponents;
