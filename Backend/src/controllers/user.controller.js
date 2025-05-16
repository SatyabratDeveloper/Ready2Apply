import { User } from "../models/user.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";

const options = {
  httpOnly: true,
  secure: true,
};

const registerUser = async (req, res, next) => {
  try {
    // get user data from frontend
    const { username, email, password } = req.body;

    // validation
    if ([username, email, password].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All field are required.");
    }

    // check if user is already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(409, "User with this email already exists.");
    }

    // create user object in db - create entry in db
    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
    });

    // check if user is created in db and remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    // if db created successfully, return response
    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User registered successfully."));
  } catch (error) {
    next(error);
  }
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    // find the user by its id
    const user = await User.findById(userId);

    // generate access and refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // save the refreshToken to DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong, while generating access and refresh token."
    );
  }
};

const loginUser = async (req, res, next) => {
  try {
    // get the user data from frontend
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      throw new ApiError(400, "Email and password is required.");

    // get the user data from the db
    const user = await User.findOne({ email });

    if (!user)
      throw new ApiError(400, "User not found with this email address.");

    // check password
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) throw new ApiError(400, "Password is invalid.");

    // generate refresh and access tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // update user because refresh token is not update here in user
    // we can query in DB or update the user object to update refresh token
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // send cookies and return response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "User logged in successfully."
        )
      );
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.user?._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out successfully."));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while logging out the user.");
  }
};

const getCurrentUser = (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully."));
};

const changeCurrentPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid old password.");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully."));
  } catch (error) {
    next(error);
  }
};

const updateAccountDetails = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    if (!(username && email)) {
      throw new ApiError(400, "Fields are empty.");
    }

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: { username, email },
      },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json(
        new ApiResponse(200, user, "Account details updated successfully.")
      );
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res) => {
  const refreshTokenReceived =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshTokenReceived) {
    throw new ApiError(401, "Unauthorized request.");
  }

  try {
    const decodedRefreshToken = jwt.verify(
      refreshTokenReceived,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!decodedRefreshToken) {
      throw new ApiError(401, "Unauthorized request.");
    }

    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token.");
    }

    if (refreshTokenReceived !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user?._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed successfully."
        )
      );
  } catch (error) {
    throw new ApiError(
      401,
      error.message || "Something went wrong while refreshing access token."
    );
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeCurrentPassword,
  updateAccountDetails,
  refreshAccessToken,
};
