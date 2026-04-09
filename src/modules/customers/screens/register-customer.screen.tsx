import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { registerCustomers } from "../services/customers.services";
import type { ReqRegisterCustomerFormData } from "../models/customers.models";

const schema: yup.ObjectSchema<ReqRegisterCustomerFormData> = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email")?.optional(),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  address: yup.string()?.optional(),
  others: yup.string()?.optional(),
});

export default function RegisterCustomerScreen() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [apiError, setApiError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ReqRegisterCustomerFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ReqRegisterCustomerFormData) => {
    try {
      setLoading(true);
      setApiError(null);

      await registerCustomers(data);

      // success
      reset();
      alert("Customer created successfully ✅");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);

      // backend validation errors
      if (err?.errors) {
        Object.keys(err.errors).forEach((field) => {
          setError(field as keyof ReqRegisterCustomerFormData, {
            type: "server",
            message: err.errors[field],
          });
        });
      } else {
        setApiError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Register Customer</h2>

      {apiError && <div className="alert alert-error mb-3">{apiError}</div>}
      <div className="w-full w-xs">
        {" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="Phone"
                className="input input-bordered w-full"
                {...register("phone")}
              />
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            </div>
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
                {...register("name")}
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                {...register("email")}
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            {/* Address */}
            <div>
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered w-full"
                {...register("address")}
              />
              <p className="text-red-500 text-sm">{errors.address?.message}</p>
            </div>
            <div>
              <textarea
                placeholder="Others"
                className="textarea textarea-bordered w-full"
                {...register("others")}
                cols={8}
              />
              <p className="text-red-500 text-sm">{errors.others?.message}</p>
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-neutral w-full mt-4 ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
