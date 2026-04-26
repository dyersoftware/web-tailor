import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAssignedCustomers } from "../services/customers.services";
import type { ICustomer } from "../models/customers.models";
import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";
import DataTableComponent from "../../../resources/components/DataTableComponent";

function CustomersListComponents() {
  const [data, setData] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customers = await getAssignedCustomers();
        setData(customers);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load customers",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const columns = [
    {
      header: "S.No",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => row.index + 1,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email", meta: { label: "📧 Email" } },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "created_at", header: "Created" },
    {
      header: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: { row: any }) => {
        const customer = row.original;
        console.log(row, "row");
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

  return (
    <DataTableComponent
      data={data}
      columns={columns}
      loading={loading}
      error={error}
    />
  );
}

export default CustomersListComponents;
