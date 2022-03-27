import ProfileDAO from "../../dao/profileDAO.js";
import UsersDAO from "../../dao/usersDAO.js";
import PostsDAO from "../../dao/postsDAO.js";
import { check, validationResult } from "express-validator";
// import config from "config";
import CustomError from "../../../lib/error.js";

export default class ProfileCtrl {
  static async apiGetAuthProfile(req, res) {
    try {
      const profile = await ProfileDAO.getAuthProfile(req.user.id);

      if (!profile) throw new CustomError("404", "Profile Not Found");

      res.json(profile);
    } catch (e) {
      switch (e.kind) {
        case "404": {
          return res.status(e.kind).json(e);
        }
        case "ObjectId": {
          return res
            .status(404)
            .json({ kind: e.kind, msg: "404 Not Found", error: e.toString() });
        }
        default: {
          res.status(500).json({ msg: "Server Error", error: e.toString() });
        }
      }
    }
  }
  static apiValidateProfile() {
    return [
      check("status", "Status is required").notEmpty(),
      check("skills", "Skills is required").notEmpty(),
    ];
  }
  static async apiCreateUpdateUserProfile(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        throw new CustomError("400", "Validation Error", errors.array());

      const {
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        skills,
        ...profileFields
      } = req.body;

      if (skills) {
        profileFields.skills = skills.split(",").map((skill) => skill.trim());
      }

      const socialFields = { youtube, facebook, instagram, linkedin };

      profileFields.social = { ...socialFields };

      const profile = await ProfileDAO.createUpdateUserProfile(
        req.user.id,
        profileFields
      );
      res.json(profile);
    } catch (e) {
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }
  static async apiGetAllProfiles(req, res) {
    try {
      const profiles = await ProfileDAO.getAllProfiles();

      if (!profiles) throw new CustomError("404", "No Profile Found");

      res.json(profiles);
    } catch (e) {
      if (e.kind == "404") return res.status(404).json(e);
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static async apiGetProfileById(req, res) {
    try {
      const profile = await ProfileDAO.getProfileById(req.params.user_id);

      if (!profile) throw new CustomError("404", "Profile Not Found");

      res.json(profile);
    } catch (e) {
      switch (e.kind) {
        case "404": {
          res.status(e.kind).json(e);
        }
        case "ObjectId": {
          return res.status(400).json({
            kind: e.kind,
            msg: "Profile Not Found",
            error: e.toString(),
          });
        }
        default: {
          res.status(500).json({ msg: "Server Error", error: e.toString() });
        }
      }
    }
  }

  static async apiDeleteAccount(req, res) {
    try {
      const postsRes = await PostsDAO.deleteAllPosts(req.user.id);

      const profileRes = await ProfileDAO.deleteProfile(req.user.id);

      const userRes = await UsersDAO.deleteUser(req.user.id);
      if (!profileRes && !userRes && postsRes.deletedCount == 0)
        throw new CustomError("404", "Account Not Found");

      res.json({ profileRes, userRes });
    } catch (e) {
      switch (e.kind) {
        case "404": {
          res.status(404).json(e);
        }
        case "ObjectId": {
          res.status(404).json({
            kind: e.kind,
            msg: "Account Not Found",
            error: e.toString(),
          });
        }
        default: {
          res.status(500).json({ msg: "Server Error", error: e.toString() });
        }
      }
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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw new CustomError("400", "Validation Error", errors.array());

      if (!req.body.to && !req.body.current)
        throw new CustomError("400", "Validation Error", [
          { msg: "Either One of 'To' or 'Current' Fields Shoud Be Specified" },
        ]);

      const profileRes = await ProfileDAO.addProfileExperience(
        req.user.id,
        req.body
      );

      res.json(profileRes);
    } catch (e) {
      switch (e.kind) {
        case "400":
        case "404": {
          res.status(e.kind).json(e);
        }
        default: {
          res
            .status(500)
            .json({ msg: "Server Error", error: e.toString(), stack: e.stack });
        }
      }
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
      switch (e.kind) {
        case "404": {
          res.status(e.kind).json(e);
        }

        case "ObjectId": {
          res.status(404).json({
            kind: e.kind,
            msg: "Experience Not Found",
            error: e.toString(),
            stack: e.stack,
          });
        }
        default: {
          res.status(500).json({ msg: "Server Error", error: e.toString() });
        }
      }
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
    try {
      const errors = validationResult(req);
      // console.log(req.body.current, req.body.to);
      if (!req.body.current && !req.body.to)
        errors.errors.push({ msg: "Invalid date" });

      if (!errors.isEmpty())
        throw new CustomError("400", "Validation Error", errors.array());

      const profileRes = await ProfileDAO.addProfileEducation(
        req.user.id,
        req.body
      );

      res.json(profileRes);
    } catch (e) {
      if (e.kind == "400" || e.kind == "404") return res.status(400).json(e);
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
      if (e.kind == "404") return res.status(e.kind).json(e);
      if (e.kind == "ObjectId")
        return res.status(404).json({
          kind: e.kind,
          msg: "Education Not Found",
          error: e.toString(),
          stack: e.stack,
        });
      // res
      //   .status(500)
      //   .json(new CustomError(500, "Server Error", null, error.toString()));
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static async apiGetUserGHRepos(req, res) {
    try {
      const reposRes = await ProfileDAO.getUserGHRepos(req.params.username);
      res.json(reposRes);
    } catch (e) {
      res.status(e.response.status).json(e);
    }
  }
}
