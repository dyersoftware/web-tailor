import { Link } from "react-router-dom";
import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";
import CustomersListComponents from "../components/customers-list.component";

function CustomersListScreen() {
  return (
    <>
      <div className="bg-base-100  shadow-sm p-2 rounded-lg flex items-center justify-end">
        <div className="">
          <Link
            className="btn btn-primary text-white"
            to={navigate_paths.customers_paths.assignCustomer}
          >
            Assign Customer
          </Link>
        </div>
      </div>

      <CustomersListComponents />
    </>
  );
}

export default CustomersListScreen;
