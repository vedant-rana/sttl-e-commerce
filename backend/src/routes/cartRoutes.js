import express from "express";
import { RouteStrings } from "../utils/constants/routeStrings.js";
import { TryCatch } from "../utils/features/tryCatch.js";
import {
  convertCartToOrder,
  deleteItemFromCart,
  getCartForUser,
  manageQuantity,
  syncCart,
} from "../controllers/cartController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @Request : POST
 * @Route : /api/v1/cart/sync
 */
router.route(RouteStrings.CREATE_CART).post(isAuthorized, TryCatch(syncCart));

/**
 * @Request : GET
 * @Route : /api/v1/cart
 */
router
  .route(RouteStrings.SINGLE_CART)
  .get(isAuthorized, TryCatch(getCartForUser));

/**
 * @Request : GET
 * @Route : /api/v1/cart/process
 */
router
  .route(RouteStrings.PROCESS_CART)
  .get(isAuthorized, TryCatch(convertCartToOrder));

/**
 * @Request : PUT
 * @Route : /api/v1/cart/item
 */
router
  .route(RouteStrings.MANAGE_CART)
  .put(isAuthorized, TryCatch(manageQuantity));

/**
 * @Request : DELETE
 * @Route : /api/v1/cart/item/:productId
 */
router
  .route(RouteStrings.DELETE_ITEM)
  .delete(isAuthorized, TryCatch(deleteItemFromCart));

export default router;
