import { User } from "../models/user.model.js";
import { ApiError } from "../utils";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    // get accessToken from cookie or header
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // verify token from jwt
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // get user by db query
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    // add user to req - it will be available if user is logged in
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid access token");
  }
};

export default verifyJWT;
