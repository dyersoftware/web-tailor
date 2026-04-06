export const handleApiError = (error: any): string => {
  if (error.response) {
    return error.response.data?.message || "Something went wrong";
  }

  if (error.request) {
    return "Network error, please try again";
  }

  return error.message || "Unexpected error occurred";
};
