import CustomerDetailsScreen from "../screens/customer-details.screen";
import CustomersListScreen from "../screens/customers-list.screen";
import FindAndAssignCustomerScreen from "../screens/find-and-assign-customer.screen";
import RegisterCustomerScreen from "../screens/register-customer.screen";

const customersRoutes = [
  { index: true, element: <CustomersListScreen /> },
  { path: "register-customer", element: <RegisterCustomerScreen /> },
  { path: "details-customer/:id", element: <CustomerDetailsScreen /> },
  {
    path: "find-and-assign-customer",
    element: <FindAndAssignCustomerScreen />,
  },
];

export default customersRoutes;
