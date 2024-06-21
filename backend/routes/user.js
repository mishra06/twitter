const express = require("express");


const userController = require("../controllers/user");
// const passport = require("../middlewares/auth");
// const Authentication = require("../middlewares/auth");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

router.post("/register",userController.Register);
router.post("/login",userController.Login);
router.get("/logout",userController.Logout);
router.put("/bookmark/:id",isAuthenticated,userController.Bookmark);
router.get("/profile/:id",isAuthenticated,userController.GetMyProfile);
router.get("/otheruser/:id",isAuthenticated,userController.GetOtherProfile);
router.post("/follow/:id",isAuthenticated,userController.Follow);
router.post("/unfollow/:id",isAuthenticated,userController.Unfollow);

module.exports = router;