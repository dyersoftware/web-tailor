import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";
import { getOrders } from "../services/orders.services";
import type { IOrder } from "../models/orders.models";
import DataTableComponent from "../../../resources/components/DataTableComponent";

function OrdersListComponents() {
  const { id } = useParams();

  const [data, setData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
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

    fetchOrders();
  }, [id]);

  const columns = [
    {
      header: "S.No",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => row.index + 1,
    },
    {
      accessorKey: "order_number",
      header: "Order Number",
      meta: { label: "🧾 Order" },
    },
    {
      accessorKey: "total_amount",
      header: "Total Amount",
      meta: { label: "💰 Amount" },
    },
    {
      accessorKey: "payment_type",
      header: "Payment Type",
      meta: { label: "💳 Payment Type" },
    },
    {
      accessorKey: "payment_status",
      header: "Payment Status",
      meta: { label: "📊 Status" },
    },
    {
      accessorKey: "customer_name",
      header: "Customer Name",
      meta: { label: "🧑 Customer" },
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

  return (
    <DataTableComponent
      data={data}
      columns={columns}
      loading={loading}
      error={error}
    />
  );
}

export default OrdersListComponents;
