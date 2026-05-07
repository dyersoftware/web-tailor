import type { GenericApiResponse } from "../../../resources/models/api.models";

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
  admin_user_id: string;
}

export interface ICustomersResponse extends GenericApiResponse {
  data: ICustomer[];
}

export interface ApiErrorResponse {
  errors?: object;
  status?: boolean;
  message?: string;
}

export interface IResRegisteredCustomerResponse extends ApiErrorResponse {
  data?: object;
}

export interface ReqRegisterCustomerFormData {
  name: string;
  email?: string;
  phone: string;
  address?: string;
  others?: string;
}

export interface IResCustomerDetails extends ApiErrorResponse {
  data: ICustomerDetails;
}

export interface ICustomerDetails {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
  admin_user_id: string;
}

export interface IResAssignedCustomer extends ApiErrorResponse {
  data?: object;
}
