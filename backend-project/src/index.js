import express from "express";
import socketIO from "socket.io";
import http from "http";
import morgan from "morgan";
import routes from "./config/routes";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./config/env";
import { NODE_ENV } from "./config/env";
import Product from "./components/product/product";
import "./config/database";
import "./services/load";

const app = express();
const server = http.createServer(app);

const io = socketIO(server);
io.on("connection", socket => {
  socket.on("initial_data", () => {
    Product.find({}).then(products => {
      io.sockets.emit("data", products);
    });
  });

  socket.on("updateProduct", product => {
    Product.update(
      { _id: product._id },
      {
        $set: {
          name: product.name,
          type: product.type,
          price: product.price,
          rating: product.rating,
          warranty_years: product.warranty_years,
          available: product.available
        }
      }
    ).then(updatedproduct => {
      console.log("**************", updatedproduct);
      io.sockets.emit("change_data");
    });
  });

  socket.on("deleteProduct", productId => {
    Product.remove({ _id: productId }).then(() => {
      io.sockets.emit("change_data");
    });
  });
});

app.use(
  bodyParser.json({
    limit: "4mb"
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(morgan("dev"));
app.use(cors());
app.use("/", routes);

server.listen(PORT, () =>
  console.log("start in " + NODE_ENV + " on port" + PORT)
);
export default io;
