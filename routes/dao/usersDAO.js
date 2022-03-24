import User from "../../models/User.js";

export default class UsersDAO {
  static async emailExistsCheck(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (e) {
      console.error(`Unable to check users: ${e}`);
      // return { error: e };
    }
  }
  static async registerUser(personalInfo) {
    console.log(personalInfo);
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
  static async deleteUser(id) {
    try {
      const userDeletionRes = await User.findOneAndDelete({ _id: id });
      return userDeletionRes;
    } catch (e) {
      console.error(`Unable to delete user: ${e}`);
      throw e;
    }
  }
}
