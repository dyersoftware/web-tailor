/* eslint-disable react-hooks/incompatible-library */
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router-dom";

import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";
import { getOrders } from "../services/orders.services";
import type { IOrder } from "../models/orders.models";

function OrdersListComponents() {
  const { id } = useParams();

  const [data, setData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const orders = await getOrders(Number(id));
      setData(orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [id]);

  const columns = [
    {
      header: "S.No",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => row.index + 1,
    },
    { accessorKey: "order_number", header: "Order Number" },
    { accessorKey: "total_amount", header: "Total Amount" },
    { accessorKey: "payment_type", header: "Payment Type" },
    { accessorKey: "payment_status", header: "Payment Status" },
    { accessorKey: "customer_name", header: "Customer Name" },

    { accessorKey: "created_at", header: "Created" },

    {
      header: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const order = row.original;

        return (
          <div className="flex gap-2">
            <button
              className="btn btn-xs sm:btn-sm btn-primary"
              onClick={() =>
                navigate(
                  `${navigate_paths.orders_paths.orderDetails}/${order.id}`,
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
        {data.map((order, index) => (
          <div key={order.id} className="card bg-base-100 shadow border">
            <div className="card-body p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">
                  {index + 1}. {order.order_number || "Order"}
                </h2>
                <div className="badge badge-outline">ID: {order.id}</div>
              </div>

              <p className="text-sm">
                🧑 <span className="font-medium">Customer Name:</span>{" "}
                {order.customer_name || "N/A"}
              </p>
              <p className="text-sm">
                📧 <span className="font-medium">Total Amount:</span>{" "}
                {order.total_amount || "N/A"}
              </p>

              <p className="text-sm">
                🕒 <span className="font-medium">Payment Status:</span>{" "}
                {order.payment_status || "N/A"}
              </p>

              <p className="text-sm">
                🕒 <span className="font-medium">Payment Type:</span>{" "}
                {order.payment_type || "N/A"}
              </p>

              <p className="text-xs text-gray-500">
                Created: {new Date(order.created_at).toLocaleString()}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  className="btn btn-xs btn-primary flex-1"
                  onClick={() =>
                    navigate(
                      `${navigate_paths.orders_paths.orderDetails}/${order.id}`,
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

export default OrdersListComponents;
