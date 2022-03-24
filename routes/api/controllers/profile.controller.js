import ProfileDAO from "../../dao/profileDAO.js";
import UsersDAO from "../../dao/usersDAO.js";
import { check, validationResult } from "express-validator";
import config from "config";

export default class ProfileCtrl {
  static apiValidateUser() {
    console.log("Validation started...");
    return [
      check("status", "Status is required").notEmpty(),
      check("skills", "Skills is required").notEmpty(),
    ];
  }
  static async apiGetAuthProfile(req, res) {
    try {
      const profile = await ProfileDAO.getUserProfile(req.user.id);

      if (!profile) {
        return res
          .status(400)
          .json({ error: "There is no profile for this user" });
      }

      res.json(profile);
    } catch (e) {
      // console.error(`API: ${e}`);
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }
  static async apiCreateUpdateUserProfile(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.json({ msg: "Success" });

    const {
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
      ...profileFields
    } = req.body;
    const socialFields = { youtube, facebook, instagram, linkedin };

    profileFields.social = { ...socialFields };

    try {
      const profile = await ProfileDAO.createUpdateUserProfile(
        req.user.id,
        profileFields
      );
      res.json(profile);
    } catch (e) {
      // console.error(`API: ${e}`);
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }
  static async apiGetAllProfiles(req, res) {
    try {
      const profiles = await ProfileDAO.getAllProfiles();
      res.json(profiles);
    } catch (e) {
      // console.error(`API: ${e.message}`);
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static async apiGetProfileById(req, res) {
    try {
      const profile = await ProfileDAO.getProfileById(req.params.user_id);

      if (!profile) return res.status(400).json({ error: "Profile not found" });

      res.json(profile);
    } catch (e) {
      // console.error(`API: ${e.message}`);
      if (e.kind == "ObjectId")
        return res.status(400).json({ error: "Profile not found" });
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static async apiDeleteAccount(req, res) {
    try {
      const profileRes = await ProfileDAO.deleteProfile(req.user.id);
      const userRes = await UsersDAO.deleteUser(req.user.id);
      res.json({ profileRes, userRes });
    } catch (e) {
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static apiValidateExperience() {
    return [
      check("title", "Title is required").notEmpty(),
      check("company", "Company is required").notEmpty(),
      check("from", "From date is required").notEmpty(),
    ];
  }

  static async apiAddProfileExperience(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const profileRes = await ProfileDAO.addProfileExperience(
        req.user.id,
        req.body
      );
      res.json(profileRes);
    } catch (e) {
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static async apiDeleteProfileExperience(req, res) {
    try {
      const profileRes = await ProfileDAO.deleteProfileExperience(
        req.user.id,
        req.query.expId
      );
      res.json(profileRes);
    } catch (e) {
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static apiValidateEducation() {
    return [
      check("school", "school is required").notEmpty(),
      check("degree", "degree is required").notEmpty(),
      check("fieldofstudy", "Field of study is required").notEmpty(),
      check("from", "From date is required").notEmpty(),
    ];
  }

  static async apiAddProfileEducation(req, res) {
    const errors = validationResult(req);
    // console.log(req.body.current, req.body.to);
    if (!req.body.current && !req.body.to)
      errors.errors.push({ msg: "Invalid date" });

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const profileRes = await ProfileDAO.addProfileEducation(
        req.user.id,
        req.body
      );
      res.json(profileRes);
    } catch (e) {
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static async apiDeleteProfileEducation(req, res) {
    try {
      const profileRes = await ProfileDAO.deleteProfileEducation(
        req.user.id,
        req.query.eduId
      );
      res.json(profileRes);
    } catch (e) {
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static async apiGetUserGHRepos(req, res) {
    try {
      const reposRes = await ProfileDAO.getUserGHRepos(req.params.username);
      res.json(reposRes);
    } catch (e) {
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }
}
