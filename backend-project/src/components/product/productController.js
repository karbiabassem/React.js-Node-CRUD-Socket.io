import _ from "lodash";
import Product from "./product";
import io from "../../index";

export async function create(req, res) {
  try {
    let product = _.pick(
      req.body,
      "name",
      "type",
      "price",
      "rating",
      "warranty_years",
      "available"
    );

    Product.find()
      .sort({ _id: -1 })
      .limit(1)
      .then(pid => {
        let idProduct = pid[0]._id + 1;
        product._id = idProduct;
        product = Product.create(product);
      });

    io.sockets.emit("change_data");
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
