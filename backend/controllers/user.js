const errorHandler = require("../middlewares/errorHandler");

const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();

const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = {
    ...req.body,
    password: hash,
  };
  console.log(user);
  await UserModel.create(user);
  const { name, username, email, password } = user;
  if (!name || !username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }
  return res.status(201).json({
    message: "Account created successfully.",
    success: true,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
    });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
    });
  }
  const jwtPayload = {
    userId: user.id,
    exp: new Date().getTime() + 3600 * 1000,
  };
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY);
  return res
    .status(201)
    .cookie("token", token, { expiresIn: "1d", httpOnly: true })
    .json({
      message: `Welcome back ${user.name}`,
      user,
      success: true
    });
  // res.json({
  //     success:true,
  //     message:"Login successfully",
  //     token,
  // });
};

const logout = async (req, res) => {
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "user logged out successfully.",
    success: true,
  });
};

const bookmark = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const user = await UserModel.findById(loggedInUserId);
    if (user.bookmarks.includes(tweetId)) {
      // for remove the bookmark
      await UserModel.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Removed from bookmarks",
      });
    } else {
      // bookmarked

      await UserModel.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Saved to bookmarks.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    //tokenid===id
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOtherProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const otherUsers = await UserModel.find({ _id: { $ne: id } }).select(
      "-password"
    );

    if (!otherUsers) {
      return res.status(401).json({
        message: "Currently do not have any users.",
      });
    }
    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

const follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const otherUserId = req.params.id;
    const loggedInUser = await UserModel.findById(loggedInUserId);
    const otherUser = await UserModel.findById(otherUserId);
    if (!otherUser.followers.includes(loggedInUserId)) {
      // for follow
      await UserModel.findByIdAndUpdate(otherUserId, {
        $push: { followers: loggedInUserId },
      });
      await UserModel.findByIdAndUpdate(loggedInUserId, {
        $push: { following: otherUserId },
      });
      return res.status(200).json({
        message: "Followed successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: `You are already following to ${otherUser.name}`,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const unfollow = async (req, res) => {
  const loggedInUserId = req.body.id;
  const otherUserId = req.params.id;
  const loggedInUser = await UserModel.findById(loggedInUserId);
  const otherUser = await UserModel.findById(otherUserId);
  if(loggedInUser.following.includes(otherUserId)){
    // for unfollow
    await UserModel.findByIdAndUpdate(otherUserId, {
      $pull: { followers: loggedInUserId },
    });
    await UserModel.findByIdAndUpdate(loggedInUserId, {
      $pull: { following: otherUserId },
    });
    return res.status(200).json({
      message: "Unfollowed successfully",
      success: true,
    });
  }
  else{
    return res.status(200).json({
      message: `You are not following to ${otherUser.name}`,
      success: false,
    });
  }
};

const userController = {
  Register: errorHandler.catchAsync(register),
  Login: errorHandler.catchAsync(login),
  Logout: errorHandler.catchAsync(logout),
  Bookmark: errorHandler.catchAsync(bookmark),
  GetMyProfile: errorHandler.catchAsync(getMyProfile),
  GetOtherProfile: errorHandler.catchAsync(getOtherProfile),
  Follow: errorHandler.catchAsync(follow),
  Unfollow: errorHandler.catchAsync(unfollow),
};

module.exports = userController;
