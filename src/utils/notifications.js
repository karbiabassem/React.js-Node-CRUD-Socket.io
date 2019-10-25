import { notification } from "antd";

export const openServerErrorNotification = () => {
  notification["error"]({
    message: "Internal Server Error",
    description: "An error has occurred, please try again."
  });
};

export const openAuthWarningNotification = () => {
  notification["warning"]({
    message: "You are not logged in",
    description: "You need to log in or register to access this page."
  });
};

export const openErrorNotification = description => {
  notification["error"]({
    message: "Oups!",
    description
  });
};
export const openSuccessNotification = message => {
  notification["success"]({
    message: "Success",
    description: message
  });
};
export default {
  openServerErrorNotification,
  openAuthWarningNotification,
  openErrorNotification,
  openSuccessNotification
};
