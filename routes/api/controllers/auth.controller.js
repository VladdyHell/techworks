import config from "config";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthDAO from "../../dao/authDAO.js";
import CustomError from "../../../lib/error.js";

export default class AuthCtrl {
  static async apiGetAuthUserById(req, res) {
    try {
      const user = await AuthDAO.getAuthUserById(req.user.id);

      if (!user) throw new CustomError("404", "Authorized User Not Found!");

      res.json(user);
    } catch (e) {
      if (e.kind == "404") return res.status(e.kind).json(e);
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }
  static apiValidateUser() {
    return [
      check("email", "Please include a valid email").isEmail(),
      check("password", "Password is required").notEmpty(),
      // check("password", "Password is required").exists(),
    ];
  }
  static async apiAuthenticate(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new CustomError("400", "Validation Error", errors.array());
      }

      let { email, password } = req.body;

      const user = await AuthDAO.getUser(email);

      // Showing message as 'Invalid email' message violates the best practices
      // Use 'Invalid Credentials' instead
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "This email does not exist!", param: "email" }] });
      }

      // console.log(password, user.password);
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // res.json({ msg: "User authenticated" });
    } catch (e) {
      console.error(`API: ${e}`);
      if (e.kind == "400") return res.status(e.kind).json(e);
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }
}
