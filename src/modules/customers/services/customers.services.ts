import { httpClient } from "../../../resources/axios/send";
import { CUSTOMER_PATHS } from "../../../resources/endpoints/api_endpoints.constants";
import type {
  ICustomer,
  ICustomersResponse,
  IResAssignedCustomer,
  IResCustomerDetails,
  IResRegisteredCustomerResponse,
  ReqRegisterCustomerFormData,
} from "../models/customers.models";

export const getAssignedCustomers = async (): Promise<ICustomer[]> => {
  const response = await httpClient.get<ICustomersResponse>(
    CUSTOMER_PATHS.ASSIGNED_CUSTOMERS,
  );
  return response.data || [];
};

export const registerCustomer = async (
  customerData: ReqRegisterCustomerFormData,
): Promise<IResRegisteredCustomerResponse> => {
  const response = await httpClient.post<IResRegisteredCustomerResponse>(
    CUSTOMER_PATHS.REGISTER_CUSTOMER,
    customerData,
  );
  return response || [];
};

export const getCustomerById = async (
  customerId: string,
): Promise<IResCustomerDetails> => {
  const response = await httpClient.get<IResCustomerDetails>(
    `${CUSTOMER_PATHS.CUSTOMER_BY_ID}/${customerId}`,
  );
  return response || [];
};

export const getCustomerByMobileNumber = async (
  mobileNumber: string,
): Promise<IResCustomerDetails> => {
  const response = await httpClient.get<IResCustomerDetails>(
    `${CUSTOMER_PATHS.CUSTOMER_BY_MOBILE_NUMBER}/${mobileNumber}`,
  );
  return response || [];
};

export const assignCustomer = async (
  customer_id: number,
): Promise<IResAssignedCustomer> => {
  const response = await httpClient.post<IResAssignedCustomer>(
    `${CUSTOMER_PATHS.ASSIGN_CUSTOMER}`,
    { customer_id },
  );
  return response || [];
};
