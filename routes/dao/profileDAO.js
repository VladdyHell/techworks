import Profile from "../../models/Profile.js";
import { ObjectID as ObjectId } from "mongodb";
import config from "config";
import axios from "axios";

export default class ProfileDAO {
  static async getAuthProfile(id) {
    console.log(id);
    try {
      const getUserProfileRes = await Profile.findOne({ user: id }).populate(
        "user",
        ["firstName", "lastName", "avatar"]
      );
      return getUserProfileRes;
    } catch (e) {
      console.error(`Unable to get profile info: ${e}`);
      // return { error: e };
      throw e;
    }
  }

  static async createUpdateUserProfile(id, profileFields) {
    try {
      // The video has a different implementation for upsert
      const createUpdateResponse = await Profile.findOneAndUpdate(
        { user: id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      return createUpdateResponse;
    } catch (e) {
      console.error(`Unable to update/create profile: ${e}`);
      // return { error: e };
      throw e;
    }
  }

  static async getAllProfiles() {
    try {
      const getAllProfilesRes = await Profile.find().populate("user", [
        "firstName",
        "lastName",
        "avatar",
      ]);
      return getAllProfilesRes;
    } catch (e) {
      console.error(`Unable to get all of the profiles: ${e}`);
      throw e;
    }
  }

  static async getProfileById(id) {
    try {
      const getProfileResponse = await Profile.findOne({ user: id }).populate(
        "user",
        ["firstName", "lastName", "avatar"]
      );
      return getProfileResponse;
    } catch (e) {
      console.error(`Unable to get profile: ${e}`);
      throw e;
    }
  }

  static async deleteProfile(id) {
    try {
      const profileDeletionRes = await Profile.findOneAndDelete({ user: id });
      return profileDeletionRes;
    } catch (e) {
      console.error(`Unable to delete profile: ${e}`);
      throw e;
    }
  }

  static async addProfileExperience(id, expBody) {
    try {
      const profile = await Profile.findOne(
        { user: id }
        // { $push: { experience: { $each: [exp], $position: 0 } } }
      );

      const exists = profile.experience.some(
        (exp) => exp.title == expBody.title
      );

      if (exists)
        throw new Error(`Experience already exists: ${expBody.title}`);

      profile.experience.unshift(expBody);

      const addExperienceRes = await profile.save();

      return addExperienceRes;
    } catch (e) {
      console.error(`Unable to add profile experience: ${e}`);
      throw e;
    }
  }

  static async deleteProfileExperience(id, expId) {
    try {
      const expDeleteionRes = await Profile.updateOne(
        { user: id },
        { $pull: { experience: { _id: expId } } },
        { new: true }
      );

      // return typeof ObjectId(profile.experience[0]._id);

      return expDeleteionRes;
    } catch (e) {
      console.error(`Unable to delete profile experience: ${e}`);
      throw e;
    }
  }

  static async addProfileEducation(id, eduBody) {
    try {
      const profile = await Profile.findOne({ user: id });

      const exists = profile.education.some(
        (edu) => edu.school == eduBody.school
      );

      if (exists)
        throw new Error(`Education already exists: ${eduBody.school}`);

      profile.education.unshift(eduBody);

      const addEducationRes = await profile.save();

      return addEducationRes;
    } catch (e) {
      console.error(`Unable to add profile educaation: ${e}`);
      throw e;
    }
  }

  static async deleteProfileEducation(id, eduId) {
    try {
      const eduDeleteionRes = await Profile.updateOne(
        { user: id },
        { $pull: { education: { _id: eduId } } },
        { new: true }
      );

      // return typeof ObjectId(profile.experience[0]._id);

      return eduDeleteionRes;
    } catch (e) {
      console.error(`Unable to delete profile education: ${e}`);
      throw e;
    }
  }
  static async getUserGHRepos(username) {
    try {
      const uri = encodeURI(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
      );

      const headers = {
        "user-agent": "node.js",
        Authorization: `token ${config.get("githubClientSecret")}`,
      };

      const getGHReposRes = await axios.get(uri, headers);
      return getGHReposRes.data;
    } catch (e) {
      console.error(`Unable to get github repositories: ${e}`);
      throw e;
    }
  }
}
