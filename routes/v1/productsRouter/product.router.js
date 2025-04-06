import express from "express";
import { getProductsController } from "../../../controller/products.controller.js";
import { responseHandler } from "../../../middlewares/responseHandler.js";

const productsRouter = express.Router();

productsRouter.route("/").get(getProductsController, responseHandler);

// 🔒 Protected Route: Add a new product (Only for authenticated Admins)
// router.post("/", authenticateUser, verifyAdminAccess, addProduct);

export default productsRouter;
