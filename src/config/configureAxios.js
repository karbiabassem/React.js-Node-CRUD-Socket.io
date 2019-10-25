import axios from "axios";
import notification from "../utils/notifications";

import { history } from "../App";

const instance = axios.create({
  baseURL: "http://localhost:4000/"
});

refreshToken();

instance.interceptors.response.use(null, error => {
  switch (error.response && error.response.status) {
    case 401:
      localStorage.setItem("connected", false);
      localStorage.setItem("token", "");
      window.location.reload();
      notification.openAuthWarningNotification();
      history.push("/login");
      break;
    case 404:
      console.log("*******************404**********");

      // history.push("/not-found");
      // window.location.reload();
      break;

    case 500:
      notification.openServerErrorNotification();
      break;

    default:
      break;
  }

  return Promise.reject(error);
});
export function refreshToken() {
  const token = localStorage.getItem("token");
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export default instance;
