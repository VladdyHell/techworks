import { Router } from "express";
import ProfileCtrl from "../controllers/profile.controller.js";
import auth from "../../../middleware/auth.js";

const router = Router();

// @route  GET api/v1/profile/me
// @desc   Get current user's profile
// @access Private
router.get("/me", auth, ProfileCtrl.apiGetAuthProfile);

router
  .route("/")
  // @route    GET api/v1/profile
  // @desc     Get all profiles
  // @access   Public
  .get(ProfileCtrl.apiGetAllProfiles)

  // @route  POST api/v1/profile
  // @desc	 Create or update user profile
  // @access Private
  .put(
    auth,
    ProfileCtrl.apiValidateProfile(),
    ProfileCtrl.apiCreateUpdateUserProfile
  )

  // @route    DELETE api/v1/profile
  // @desc		 Delete profile, user & posts
  // @access   Private
  .delete(auth, ProfileCtrl.apiDeleteAccount);

// @route    GET api/v1/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", ProfileCtrl.apiGetProfileById);

router
  .route("/experience")

  // @route    POST api/v1/profile/experience
  // @desc     Add profile experience
  // @access   Private
  .post(
    auth,
    ProfileCtrl.apiValidateExperience(),
    ProfileCtrl.apiAddProfileExperience
  )

  // @route		DELETE api/v1/experience?expId=<expId>
  // @desc		Delete profile experience
  // @access	Private
  .delete(auth, ProfileCtrl.apiDeleteProfileExperience);

router
  .route("/education")

  // @route    POST api/v1/profile/education
  // @desc     Add profile education
  // @access   Private
  .post(
    auth,
    ProfileCtrl.apiValidateEducation(),
    ProfileCtrl.apiAddProfileEducation
  )

  // @route		DELETE api/v1/education?eduId=<eduId>
  // @desc		Delete profile edcuation
  // @access	Private
  .delete(auth, ProfileCtrl.apiDeleteProfileEducation);

// @route		GET api/v1/profile/github/:username
// @desc		Get user repos from Github
// @access	Public
router.get("/github/:username", ProfileCtrl.apiGetUserGHRepos);

// @route   GET api/v1/profile/professions
// @desc    Get professions title list
// @access  Public
router.get('/professions', ProfileCtrl.apiGetProfessions)

export default router;
