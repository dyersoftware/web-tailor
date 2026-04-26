import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";
import type { IPayment } from "../models/payment.models";
import { getPaymentsByOrderId } from "../services/payment.services";
import DataTableComponent from "../../../resources/components/DataTableComponent";

function PaymentListComponent() {
  const { id } = useParams();

  const [data, setData] = useState<IPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const payments = await getPaymentsByOrderId(id || "");
        setData(payments);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load payments",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [id]);

  const columns = [
    {
      header: "S.No",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => row.index + 1,
    },
    {
      accessorKey: "id",
      header: "Payment ID",
      meta: { label: "🆔 Payment ID" },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      meta: { label: "💰 Amount" },
    },
    {
      accessorKey: "payment_method",
      header: "Payment Method",
      meta: { label: "💳 Method" },
    },
    {
      accessorKey: "status",
      header: "Payment Status",
      meta: { label: "📊 Status" },
    },
    {
      accessorKey: "created_at",
      header: "Created",
      meta: { label: "🕒 Created" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ getValue }: any) => new Date(getValue()).toLocaleString(),
    },
    {
      header: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const payment = row.original;

        return (
          <div className="flex gap-2">
            <button
              className="btn btn-xs sm:btn-sm btn-primary "
              onClick={() =>
                navigate(
                  `${navigate_paths.payments_paths.paymentDetails}/${payment.id}`,
                )
              }
            >
              View
            </button>

            <button className="btn btn-xs sm:btn-sm btn-warning ">Edit</button>
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

export default PaymentListComponent;
