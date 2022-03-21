import User from "../../models/Users.js";

export default class UsersDAO {
  static async emailExistsCheck(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (e) {
      console.error(`DAO - Unable to check users: ${e}`);
      return { error: e };
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
      console.error(`DAO - Unable to register the user: ${e}}`);
      return { error: e };
    }
  }
}
