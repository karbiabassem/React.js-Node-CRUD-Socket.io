import instanceOfAxios from "../../config/configureAxios";
import { openErrorNotification } from "../../utils/notifications";
import { refreshToken } from "../../config/configureAxios";
export async function login(user) {
  try {
    const { data } = await instanceOfAxios.post("/api/auth/signin", user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("connected", "true");
    refreshToken();

    return { success: true, data };
  } catch (ex) {
    if (ex.response != null) {
      if (ex.response.status === 400) {
        openErrorNotification(ex.response.error);
      }
    }
    return { success: false };
  }
}
export async function signUp(user) {
  try {
    const { data } = await instanceOfAxios.post("/api/auth/signup", user);

    return { success: true, data };
  } catch (ex) {
    if (ex.response != null) {
      if (ex.response.status === 400) {
        openErrorNotification(ex.response.error);
      }
    }
    return { success: false };
  }
}
export default {
  login,
  signUp
};
