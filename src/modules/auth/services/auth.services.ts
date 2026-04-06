import axios from "../../../resources/axios/axios";
import { tokenService } from "../../../resources/axios/token";

export const login = async (payload: { email: string; password: string }) => {
  const res = await axios.post("/auth/login", payload);

  const { access_token, refresh_token } = res.data;

  tokenService.setTokens(access_token, refresh_token);

  return res.data;
};
