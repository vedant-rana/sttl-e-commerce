import express from "express";
import { RouteStrings } from "../utils/constants/routeStrings.js";
import { TryCatch } from "../utils/features/tryCatch.js";
import { createCart, getCartById } from "../controllers/cartController.js";

const router = express.Router();

/**
 * @Request : POST
 * @Route : /api/v1/cart/create
 */
router.route(RouteStrings.CREATE_CART).post(TryCatch(createCart));

/**
 * @Request : GET
 * @Route : /api/v1/cart/:id
 */
router.route(RouteStrings.SINGLE_CART).get(TryCatch(getCartById));

export default router;
