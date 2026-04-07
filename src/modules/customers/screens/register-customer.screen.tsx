import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();
interface RegisterCustomerFormData {
  firstName: string;
  age: number;
}
export default function RegisterCustomerScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: RegisterCustomerFormData) => console.log(data);

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <input className="input" {...register("firstName")} />
            <p>{errors.firstName?.message}</p>

            <input className="input" {...register("age")} />
          </fieldset>
          <p>{errors.age?.message}</p>
          <button type="submit" className="btn btn-neutral mt-4 ">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
