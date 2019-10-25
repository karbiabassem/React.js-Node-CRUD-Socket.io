import instanceOfAxios from "../../config/configureAxios";
import {
  openErrorNotification,
  openSuccessNotification
} from "../../utils/notifications";
export async function createProduct(product) {
  try {
    const { data } = await instanceOfAxios.post("api/product", product);
    openSuccessNotification("the product is created");
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
  createProduct
};
