import express from "express";
import { responseHandler } from "../../../middlewares/responseHandler.js";
import { checkoutController } from "../../../controller/checkout.controller.js";

const checkoutRouter = express.Router();

checkoutRouter.route("/").post(checkoutController, responseHandler);

export default checkoutRouter;
