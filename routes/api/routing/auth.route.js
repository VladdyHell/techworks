import { Router } from "express";
import auth from "../../../middleware/auth.js";
import AuthCtrl from "../controllers/auth.controller.js";

const router = Router();

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public

router
  .route("/")
  .get(auth, AuthCtrl.apiGetAuthUser)
  .post(AuthCtrl.apiValidateUser(), AuthCtrl.apiAuthenticate);

export default router;
