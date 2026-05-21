import { useMemo, useState } from "react";
import DataTableComponent from "../../../resources/components/DataTableComponent";

interface IOrderItemDraft {
  id: number;
  item_type: string;
  quantity: number;
  price: number;

  chest?: number;
  shoulder?: number;
  sleeve?: number;
  collar?: number;

  waist?: number;
  hip?: number;

  length?: number;

  design_notes?: string;

  status: string;
}

const initialForm: IOrderItemDraft = {
  id: 0,
  item_type: "shirt",
  quantity: 1,
  price: 0,

  chest: 0,
  shoulder: 0,
  sleeve: 0,
  collar: 0,

  waist: 0,
  hip: 0,

  length: 0,

  design_notes: "",

  status: "pending",
};

function CreateOrderScreen() {
  const [items, setItems] = useState<IOrderItemDraft[]>([]);

  const [formData, setFormData] = useState<IOrderItemDraft>(initialForm);

  const [loading] = useState(false);

  const [error] = useState<string | null>(null);

  // ✅ Add Item
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        ...formData,
        id: Date.now(),
      },
    ]);

    // ✅ Reset Form
    setFormData(initialForm);

    // ✅ Close Modal
    (document.getElementById("add_item_modal") as HTMLDialogElement)?.close();
  };

  // ✅ Delete Item
  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Total
  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const columns = [
    {
      header: "S.No",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => row.index + 1,
    },

    {
      accessorKey: "item_type",
      header: "Item Type",
      meta: { label: "👕 Item" },
    },

    {
      accessorKey: "quantity",
      header: "Qty",
      meta: { label: "🔢 Qty" },
    },

    {
      accessorKey: "price",
      header: "Price",
      meta: { label: "💰 Price" },
    },

    {
      header: "Measurements",
      meta: { label: "📏 Measurements" },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const item = row.original;

        return (
          <div className="text-xs space-y-1">
            {item.chest ? <div>Chest: {item.chest}</div> : null}

            {item.shoulder ? <div>Shoulder: {item.shoulder}</div> : null}

            {item.length ? <div>Length: {item.length}</div> : null}

            {item.waist ? <div>Waist: {item.waist}</div> : null}
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      meta: { label: "📊 Status" },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ getValue }: any) => (
        <span className="badge badge-warning badge-sm">{getValue()}</span>
      ),
    },

    {
      header: "Actions",

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const item = row.original;

        return (
          <div className="flex gap-2">
            <button
              className="btn btn-xs btn-error"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* ✅ Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create Order</h1>

          <p className="text-sm opacity-70">
            Add order items before saving order
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            (
              document.getElementById("add_item_modal") as HTMLDialogElement
            )?.showModal()
          }
        >
          + Add Item
        </button>
      </div>

      {/* ✅ Table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <DataTableComponent
            data={items}
            columns={columns}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      {/* ✅ Summary */}
      <div className="card bg-base-100 shadow">
        <div className="card-body flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <p className="text-sm opacity-70">Total items: {items.length}</p>
          </div>

          <div className="text-right">
            <div className="text-sm opacity-70">Total Amount</div>

            <div className="text-2xl font-bold">₹ {totalAmount}</div>
          </div>
        </div>
      </div>

      {/* ✅ Save Button */}
      <div className="flex justify-end">
        <button className="btn btn-success" disabled={!items.length}>
          Save Order
        </button>
      </div>

      {/* ✅ Modal */}
      <dialog id="add_item_modal" className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="text-xl font-bold mb-6">Add Order Item</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item Type */}
            <div>
              <label className="label">
                <span className="label-text">Item Type</span>
              </label>

              <select
                className="select select-bordered w-full"
                value={formData.item_type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    item_type: e.target.value,
                  }))
                }
              >
                <option value="shirt">Shirt</option>

                <option value="pant">Pant</option>

                <option value="kurta">Kurta</option>

                <option value="blouse">Blouse</option>

                <option value="coat">Coat</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>

              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    quantity: Number(e.target.value),
                  }))
                }
              />
            </div>

            {/* Price */}
            <div>
              <label className="label">
                <span className="label-text">Price</span>
              </label>

              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
              />
            </div>

            {/* Chest */}
            <div>
              <label className="label">
                <span className="label-text">Chest</span>
              </label>

              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.chest}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    chest: Number(e.target.value),
                  }))
                }
              />
            </div>

            {/* Shoulder */}
            <div>
              <label className="label">
                <span className="label-text">Shoulder</span>
              </label>

              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.shoulder}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shoulder: Number(e.target.value),
                  }))
                }
              />
            </div>

            {/* Length */}
            <div>
              <label className="label">
                <span className="label-text">Length</span>
              </label>

              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.length}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    length: Number(e.target.value),
                  }))
                }
              />
            </div>

            {/* Waist */}
            <div>
              <label className="label">
                <span className="label-text">Waist</span>
              </label>

              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.waist}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    waist: Number(e.target.value),
                  }))
                }
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="label">
                <span className="label-text">Design Notes</span>
              </label>

              <textarea
                className="textarea textarea-bordered w-full"
                rows={4}
                value={formData.design_notes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    design_notes: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>

            <button className="btn btn-primary" onClick={handleAddItem}>
              Add Item
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default CreateOrderScreen;
