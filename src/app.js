import express from "express";
import cors from "cors";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import httpStatus from "http-status";
import { errorConverter, errorHandler } from "./middlewares/error.js";
import ApiError from "./utils/ApiError.js";
import helmet from "helmet";
import router from "./routes/v1/index.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";

const app = express();

app.use(express.json({ limit: "1mb" }));
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// // parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// // gzip compression
app.use(compression());

// // enable cors
app.use(cors());

app.options("*", cors());


// app.use("/", healthRoute);

// v1 api routes
app.use(rateLimiter);
app.use("/api/v1", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError("FRV0000", "Not found", httpStatus.NOT_FOUND));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
