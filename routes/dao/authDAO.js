import User from "../../models/Users.js";

export default class AuthDAO {
  static async getAuthUser(id) {
    const user = await User.findById(id).select("-password");
    return user;
  }
  static async getUser(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (e) {
      console.error(`DAO - Unable to check users: ${e}`);
      return { error: e };
    }
  }
}
