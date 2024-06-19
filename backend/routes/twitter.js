const express = require("express");

// const passport = require("../middlewares/auth");
// const Authentication = require("../middlewares/auth");
const isAuthenticated = require("../middlewares/auth");
const twitterController = require("../controllers/twitter");

const router = express.Router();

router.post("/create",isAuthenticated,twitterController.createTweet);
router.delete("/delete/:id",isAuthenticated,twitterController.deleteTweet);
router.put("/like/:id",isAuthenticated,twitterController.likeOrDislike);
router.get("/alltweets/:id",isAuthenticated,twitterController.getAllTweets);
router.get("/followingtweets/:id",isAuthenticated,twitterController.getFollowingTweets);

// router.post("/create",twitterController.createTweet);
// router.delete("/delete/:id",twitterController.deleteTweet);
// router.put("/like/:id",twitterController.likeOrDislike);
// router.get("/alltweets",twitterController.getAllTweets);
// router.get("/followingtweets/:id",twitterController.getFollowingTweets);

module.exports = router;