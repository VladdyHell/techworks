import { Router } from "express";
import UsersCtrl from "../controllers/users.controller.js";

const router = Router();

// @route  POST api/v1/users
// @desc   Register user
// @access Public

router.post("/", UsersCtrl.apiValidateUser(), UsersCtrl.apiRegisterUser);

export default router;
