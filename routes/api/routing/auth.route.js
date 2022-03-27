import { Router } from "express";
import auth from "../../../middleware/auth.js";
import AuthCtrl from "../controllers/auth.controller.js";

const router = Router();

router
  .route("/")
  // @route  GET api/v1/auth
  // @desc   Get user by token
  // @access Private
  .get(auth, AuthCtrl.apiGetAuthUserById)

  // @route  POST api/v1/auth
  // @desc   Authenticate user & get token
  // @access Public
  .post(AuthCtrl.apiValidateUser(), AuthCtrl.apiAuthenticate);

export default router;
