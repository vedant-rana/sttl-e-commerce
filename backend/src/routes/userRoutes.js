import express from "express";
import {
  deleteUser,
  getAllUsers,
  getMyDetails,
  getSingleUser,
  logOutUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userControllers.js";
import { RouteStrings } from "../utils/constants/routeStrings.js";
import { TryCatch } from "../utils/features/tryCatch.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @Request : POST
 * @Route : /api/v1/users/register
 */
router.route(RouteStrings.REGISTER_USER).post(TryCatch(registerUser));

/**
 * @Request : POST
 * @Route : /api/v1/users/login
 */
router.route(RouteStrings.LOGIN_USER).post(TryCatch(loginUser));

/**
 * @Request : GET
 * @Route : /api/v1/users/me
 */
router.route(RouteStrings.USER_SELF).get(isAuthorized, TryCatch(getMyDetails));

/**
 * @Request : GET
 * @Route : /api/v1/users/all
 */
router.route(RouteStrings.ALL_USERS).get(isAuthorized, TryCatch(getAllUsers));

/**
 * @Request : GET
 * @Route : /api/v1/users/logout
 */
router.route(RouteStrings.LOGOUT_USER).get(isAuthorized, TryCatch(logOutUser));

/**
 * @Request : GET
 * @Route : /api/v1/users/:id
 */
router
  .route(RouteStrings.USER_DETAILS)
  .get(isAuthorized, TryCatch(getSingleUser));

/**
 * @Request : PUT
 * @Route : /api/v1/users/:id
 */
router.route(RouteStrings.UPDATE_USER).put(isAuthorized, TryCatch(updateUser));

/**
 * @Request : DELETE
 * @Route : /api/v1/users/:id
 */
router
  .route(RouteStrings.DELETE_USER)
  .delete(isAuthorized, TryCatch(deleteUser));

export default router;
