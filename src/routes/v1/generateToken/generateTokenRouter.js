import express from "express";
import { responseHandler } from "../../../middlewares/responseHandler.js";
import { generateTokenController } from "../../../controller/generateToken.controller.js";

const generateTokenRouter = express.Router();

generateTokenRouter.route("/").get(generateTokenController, responseHandler);

export default generateTokenRouter;