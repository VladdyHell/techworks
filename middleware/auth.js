import jwt from "jsonwebtoken";
import config from "config";

export default function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // decoded returns the payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}
