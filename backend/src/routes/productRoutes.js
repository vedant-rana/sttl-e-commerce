import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";
import { isAuthorized } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import { RouteStrings } from "../utils/constants/routeStrings.js";
import { TryCatch } from "../utils/features/tryCatch.js";

const router = express.Router();

/**
 * @Request : POST
 * @Route : /api/v1/products/create
 */
router
  .route(RouteStrings.CREATE_PRODUCT)
  .post(isAuthorized, singleUpload, TryCatch(createProduct));

/**
 * @Request : GET
 * @Route : /api/v1/products/all
 */
router.route(RouteStrings.ALL_PRODUCTS).get(TryCatch(getAllProducts));

/**
 * @Request : GET
 * @Route : /api/v1/products/:id
 */
router.route(RouteStrings.SINGLE_PRODUCT).get(TryCatch(getProductById));

export default router;
