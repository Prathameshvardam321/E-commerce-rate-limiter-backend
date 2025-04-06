import express from "express";
import { responseHandler } from "../../../middlewares/responseHandler.js";
import { checkoutController } from "../../../controller/checkout.controller.js";
import { validateCheckout } from "../../../middlewares/validations/checkoutValidation.js";

const checkoutRouter = express.Router();

checkoutRouter.route("/").post(validateCheckout,checkoutController, responseHandler);

export default checkoutRouter;
