import config from "config";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import capitalize from "capitalize";
import UsersDAO from "../../dao/usersDAO.js";
import CustomError from "../../../lib/error.js";

export default class UsersCtrl {
  static apiValidateUser() {
    return [
      check("firstName", "First name is required").not().isEmpty(),
      check("lastName", "Last name is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
    ];
  }
  static async apiRegisterUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError("400", "Validation Error", errors.array());
      }

      let { firstName, lastName, email, password } = req.body;

      // TM's implementation to the user(let) should be redeclared as
      // an instiation of User Schema constructor
      const user = await UsersDAO.emailExistsCheck(email);

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists", param: "email" }] });
      }

      const avatar = gravatar.url(email, {
        s: 200,
        r: "pg",
        d: "404",
      });

      // TM's implementation - instiate a schema before hashing

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      firstName = capitalize(firstName);
      lastName = capitalize(lastName);

      const registerResponse = await UsersDAO.registerUser({
        firstName,
        lastName,
        email,
        password,
        avatar,
      });

      // Sign in after the registration

      const payload = {
        user: {
          id: registerResponse.id,
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

      // res.json({ msg: "User registered" });
    } catch (e) {
      console.error(`API: ${e}`);
      if (e.kind == "400") return res.status(e.kind).json(e);
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }
}
