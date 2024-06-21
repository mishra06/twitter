const errorHandler = require("../middlewares/errorHandler");

const UserModel = require("../models/user");
const TwittterModel = require("../models/twitter");

const createTweet = async(req,res)=>{
    const { description, id } = req.body;
    if (!description || !id) {
        return res.status(401).json({
            message: "Fields are required.",
            success: false
        });
    };
    const user = await UserModel.findById(id).select("-password");
    await TwittterModel.create({
        description,
        userId:id,
        userDetails:user
    });
    return res.status(201).json({
        message:"Tweet created successfully.",
        success:true,
    })
}

const deleteTweet = async(req,res)=>{
    const {id}  = req.params;
        await TwittterModel.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Tweet deleted successfully.",
            success:true
        })
};

const likeOrDislike = async(req,res)=>{

    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await TwittterModel.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            // for disliking the tweets
            await TwittterModel.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message : "dislike tweet",
                success:true
                
            })
        }
        else{
            // like the twitt

            await TwittterModel.findByIdAndUpdate(tweetId,{$push:{like:loggedInUserId}});
            return res.status(200).json({
                message : " Tweet likes",
                success:true
            })
        }
        } catch (error) {
            console.log(error);
        }

};

const getAllTweets = async(req,res)=>{
    try {
        const {id} = req.params;
    const loggedInUser = await UserModel.findById(id);
    const loggedInUserTweets = await TwittterModel.find({userId:id});
    const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
        return TwittterModel.find({userId:otherUsersId});
    }))
    return res.status(200).json({
        tweets:loggedInUserTweets.concat(...followingUserTweets),
    })  
    } catch (error) {
        console.log(error);
    }  
};

const getFollowingTweets = async(req,res)=>{
    try {
        const id = req.params.id;
        const loggedInUser = await UserModel.findById(id); 
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return TwittterModel.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:[].concat(...followingUserTweet)
        });
    } catch (error) {
        console.log(error);
    }
};

const twitterController={
    createTweet: errorHandler.catchAsync(createTweet),
    deleteTweet: errorHandler.catchAsync(deleteTweet),
    likeOrDislike: errorHandler.catchAsync(likeOrDislike),
    getAllTweets: errorHandler.catchAsync(getAllTweets),
    getFollowingTweets: errorHandler.catchAsync(getFollowingTweets)
}

module.exports = twitterController;