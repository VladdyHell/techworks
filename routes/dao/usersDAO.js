import User from "../../models/User.js";

export default class UsersDAO {
  static async emailExistsCheck(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (e) {
      console.error(`Unable to check users: ${e}`);
      // return { error: e };
      throw e;
    }
  }
  static async registerUser(personalInfo) {
    try {
      const user = new User({
        ...personalInfo,
      });

      const registerResponse = await user.save();

      return registerResponse;
    } catch (e) {
      console.error(`Unable to register the user: ${e}}`);
      // return { error: e };
      throw e;
    }
  }

  // @route		Profile
  static async deleteUser(id) {
    try {
      const userDeletionRes = await User.findOneAndDelete({ _id: id });
      // const userDeletionRes = await User.findByIdAndDelete(id)

      return userDeletionRes;
    } catch (e) {
      console.error(`Unable to delete user: ${e}`);
      throw e;
    }
  }

  // @route		Posts
  static async getUserById(id) {
    try {
      const getUserRes = await User.findById(id).select("-password");
      return getUserRes;
    } catch (e) {
      console.error(`Unable to get user by ID: ${e}`);
      throw e;
    }
  }
}
