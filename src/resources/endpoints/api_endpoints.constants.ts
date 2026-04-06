const apiUrl = import.meta.env.VITE_API_BASE_URL;
export const AUTH_PATHS = {
  LOGIN: `${apiUrl}/auth/login`,
  REGISTER: `${apiUrl}/auth/register`,
};
