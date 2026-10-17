import { expressjwt } from "express-jwt";
import config from "../../config/config.js";

const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  requestProperty: "auth"
});

export default requireSignin;
