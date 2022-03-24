import config from "config";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import UsersDAO from "../../dao/usersDAO.js";

export default class UsersCtrl {
  static apiValidateUser() {
    console.log("Validation started...");
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
    console.log("Register request started...");
    // console.log("Requests", req);
    const errors = validationResult(req);
    // console.error("Errors:", errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { firstName, lastName, email, password } = req.body;

    try {
      // TM's implementation to the user(let) should be redeclared as
      // an instiation of User Schema constructor
      const user = await UsersDAO.emailExistsCheck(email);

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: 200,
        r: "pg",
        d: "404",
      });

      // TM's implementation - hash after instiating a schema
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      const registerResponse = await UsersDAO.registerUser({
        firstName,
        lastName,
        email,
        password,
        avatar,
      });

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
      console.error(e);
      res.status(500).json({ error: e.toString() });
    }
  }
}
