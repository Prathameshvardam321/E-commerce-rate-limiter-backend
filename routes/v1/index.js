import express from "express";

import productsRouter from "./productsRouter/product.router.js";
import checkoutRouter from "./checkoutRouter/checkout.router.js";
import generateTokenRouter from "./generateToken/generateTokenRouter.js";
import { auth } from "../../middlewares/auth.js";


const router = express.Router();

const protectedRouted = [
    {
        path: "/checkout",
        route: checkoutRouter,
    },
 
];
const unprotectedRoutes = [
    {
        path: "/products",
        route: productsRouter,
    },
    {
        path: "/generate-token",
        route: generateTokenRouter,
    }
]

protectedRouted.forEach((route) => {
    router.use(
        route.path,
        auth,
        route.route
    );
});


unprotectedRoutes.forEach((route) => {
    router.use(
        route.path,
        route.route
    );
});

export default router;
