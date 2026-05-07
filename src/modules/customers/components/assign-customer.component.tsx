import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  assignCustomer,
  getCustomerByMobileNumber,
} from "../services/customers.services";
import type { ICustomerDetails } from "../models/customers.models";
import { useNavigate } from "react-router-dom";
import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";

// ---- TYPES ----
type FormData = {
  mobile: string;
};

// ---- MOCK APIs ----

// ---- COMPONENT ----
export default function AssignCustomerComponent() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<ICustomerDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // ---- FETCH ----
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setCustomer(null);

    try {
      const res = await getCustomerByMobileNumber(data.mobile);

      if (!res) {
        setError("Customer not found");
      } else {
        setCustomer(res?.data || null);
      }
    } catch {
      setError("Customer not found");
    } finally {
      setLoading(false);
    }
  };

  // ---- ASSIGN ----
  const handleAssign = async () => {
    if (!customer) return;
    setActionLoading(true);

    try {
      await assignCustomer(Number(customer.id));
      alert("Customer assigned successfully ✅");
    } catch {
      setError("Assignment failed");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Assign Customer</h2>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* MOBILE INPUT */}
            <div>
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="input input-bordered w-full"
                {...register("mobile", {
                  required: "Mobile is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter valid 10 digit mobile",
                  },
                })}
              />
              {errors.mobile && (
                <p className="text-error text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* FETCH BUTTON */}
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              Fetch Customer
            </button>
          </form>

          {/* ERROR STATE */}
          {error && (
            <div className="alert alert-error mt-4 flex flex-col gap-3">
              <span>{error}</span>

              {/* REGISTER BUTTON */}
              {error === "Customer not found" && (
                <button
                  className={`btn btn-secondary ${actionLoading ? "loading" : ""}`}
                  onClick={() =>
                    navigate(
                      `${navigate_paths.customers_paths.registerCustomer}?mobile=${getValues("mobile")}`,
                    )
                  }
                >
                  Register Customer
                </button>
              )}
            </div>
          )}

          {/* CUSTOMER FOUND */}
          {customer && (
            <div className="mt-4 card bg-base-200 p-4 space-y-3">
              <h3 className="font-bold text-lg">Customer Details</h3>
              <p>
                <b>Name:</b> {customer.name}
              </p>
              <p>
                <b>Email:</b> {customer.email}
              </p>
              <p>
                <b>Phone:</b> {customer.phone}
              </p>

              {/* ASSIGN BUTTON */}
              <button
                className={`btn btn-success w-full ${actionLoading ? "loading" : ""}`}
                onClick={handleAssign}
              >
                Assign Customer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
