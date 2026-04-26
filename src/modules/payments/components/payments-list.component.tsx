/* eslint-disable react-hooks/incompatible-library */
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router-dom";

import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";
import type { IPayment } from "../models/payment.models";
import { getPaymentsByOrderId } from "../services/payment.services";

function PaymentListComponent() {
  const { id } = useParams();

  const [data, setData] = useState<IPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchPayments = async () => {
    try {
      const payments = await getPaymentsByOrderId(id || "");
      setData(payments);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [id]);

  const columns = [
    {
      header: "S.No",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => row.index + 1,
    },
    { accessorKey: "id", header: "Payment ID" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "payment_method", header: "Payment Method" },
    { accessorKey: "status", header: "Payment Status" },

    { accessorKey: "created_at", header: "Created" },

    {
      header: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const payment = row.original;

        return (
          <div className="flex gap-2">
            <button
              className="btn btn-xs sm:btn-sm btn-primary"
              onClick={() =>
                navigate(
                  `${navigate_paths.payments_paths.paymentDetails}/${payment.id}`,
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
        {data.map((payment, index) => (
          <div key={payment.id} className="card bg-base-100 shadow border">
            <div className="card-body p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">
                  {index + 1}. {payment.amount || "Payment"}
                </h2>
                <div className="badge badge-outline">ID: {payment.id}</div>
              </div>

              <p className="text-sm">
                📧 <span className="font-medium">Payment Method:</span>{" "}
                {payment.payment_method || "N/A"}
              </p>

              <p className="text-sm">
                🕒 <span className="font-medium">Payment Status:</span>{" "}
                {payment.status || "N/A"}
              </p>

              <p className="text-xs text-gray-500">
                Created: {new Date(payment.created_at).toLocaleString()}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  className="btn btn-xs btn-primary flex-1"
                  onClick={() =>
                    navigate(
                      `${navigate_paths.payments_paths.paymentDetails}/${payment.id}`,
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

export default PaymentListComponent;
