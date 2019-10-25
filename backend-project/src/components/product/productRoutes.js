import { create } from "./productController";

export default function(router) {
  router.post("/api/product", create);
}
