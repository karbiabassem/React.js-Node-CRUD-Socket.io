import express from "express";
const router = express.Router();

import productRoute from "../components/product/productRoutes";
import authRoute from "../components/auth/authRoutes";

productRoute(router);
authRoute(router);

export default router;
