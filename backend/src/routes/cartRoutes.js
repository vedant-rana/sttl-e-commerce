import express from "express";
import { RouteStrings } from "../utils/constants/routeStrings.js";
import { TryCatch } from "../utils/features/tryCatch.js";
import { createCart, getCartForUser } from "../controllers/cartController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @Request : POST
 * @Route : /api/v1/cart/create
 */
router.route(RouteStrings.CREATE_CART).post(isAuthorized, TryCatch(createCart));

/**
 * @Request : GET
 * @Route : /api/v1/cart
 */
router.route(RouteStrings.SINGLE_CART).get(isAuthorized, TryCatch(getCartForUser));

export default router;
