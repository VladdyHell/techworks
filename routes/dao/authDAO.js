import User from "../../models/User.js";

export default class AuthDAO {
  static async getAuthUserById(id) {
    try {
      const user = await User.findById(id).select("-password");
      return user;
    } catch (e) {
      console.error(`Unable to get authorized user: ${e}`);
      throw e;
    }
  }
  static async getUser(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (e) {
      console.error(`Unable to check users: ${e}`);
      throw e;
    }
  }
}
