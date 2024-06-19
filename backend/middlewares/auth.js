// const jwt = require("jsonwebtoken");
// const passport = require("passport");
// const dotenv = require("dotenv");
// dotenv.config();
// const JwtStrategy = require("passport-jwt").Strategy,
//       ExtractJwt = require("passport-jwt").ExtractJwt;

// const UserModel = require("../models/user");
// const jwtSecretKey = process.env.JWT_SECRET_KEY;
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = jwtSecretKey;

// const strategy = new JwtStrategy(opts, async function (jwt_payload, done) {
//   try {
//     const userId = jwt_payload.userId;
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return done(null, false, { message: 'Invalid user' });
//     }
//     return done(null, user);
//   } catch (error) {
//     return done(error, false);
//   }
// });

// passport.use(strategy);

// module.exports = passport;







// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const httpStatus = require("http-status");
// const { UserModel } = require("../models/user")
// async function Authentication(req, res, next){
//     try{
//         if(!req.headers.authorization){
//            return res.status(httpStatus.UNAUTHORIZED).json({
//                 message: "Token is required.",
//                 success: false
//             });
//         }
//         const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
//         if(decoded){
//             req.userId = decoded.id;
//             const user = await UserModel.findById(req.userId);
//             req.user = user     
//             next()

//         }else{

//             res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//                 message : "Invalid Token"
//             })

//         }

//     }catch(err){

//         console.log(err)

//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             message : "Invalid Token"
//         })

//     }

// }

// module.exports =  Authentication;
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const httpStatus = require("http-status");
// const { UserModel } = require("../models/user");

// async function Authentication(req, res, next) {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(httpStatus.UNAUTHORIZED).json({
//                 message: "Token is required.",
//                 success: false
//             });
//         }

//         const token = authHeader.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//         if (!decoded) {
//             return res.status(httpStatus.UNAUTHORIZED).json({
//                 message: "Invalid token.",
//                 success: false
//             });
//         }

//         req.userId = decoded.userId; // Assuming the JWT payload contains userId
//         const user = await UserModel.findById(req.userId);
        
//         if (!user) {
//             return res.status(httpStatus.UNAUTHORIZED).json({
//                 message: "User not found.",
//                 success: false
//             });
//         }

//         req.user = user;
//         next();

//     } catch (err) {
//         console.error(err);
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             message: "Invalid token.",
//             success: false
//         });
//     }
// }

// module.exports = Authentication;



const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config({
    path:"../config/.env"
})

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies.token; 
        if(!token){
            return res.status(401).json({
                message:"User not authenticated.",
                success:false
            })
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
module.exports =  isAuthenticated;