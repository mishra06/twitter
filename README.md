# README

## Overview
This repository contains two Express.js routers for handling user and Twitter-related API endpoints.

### User Endpoints
The user endpoints are responsible for managing user accounts and their interactions with other users.

- **/register**: Creates a new user account.
- **/login**: Authenticates a user and returns a JSON Web Token (JWT) for future requests.
- **/logout**: Logs out the current user.
- **/bookmark/:id**: Marks a user's profile as bookmarked.
- **/profile/:id**: Retrieves the profile of the specified user.
- **/otheruser/:id**: Retrieves the profile of a user other than the current user.
- **/follow/:id**: Follows the specified user.
- **/unfollow/:id**: Unfollows the specified user.

### Twitter Endpoints
The Twitter endpoints are responsible for managing tweets and user interactions with them.

- **/create**: Creates a new tweet.
- **/delete/:id**: Deletes the specified tweet.
- **/like/:id**: Likes or dislikes the specified tweet.
- **/alltweets/:id**: Retrieves all tweets from the specified user.
- **/followingtweets/:id**: Retrieves all tweets from users the specified user is following.

### Authentication
All endpoints except `/register` and `/login` require authentication using the `isAuthenticated` middleware. This ensures that only authenticated users can access these endpoints.

### Usage
1. Install the required dependencies by running `npm install` or `yarn install` in your terminal.
2. Start the server by running `node server.js` or `yarn start` in your terminal.
3. Use a tool like Postman or cURL to send HTTP requests to the specified endpoints.

### Notes
- The `isAuthenticated` middleware is used to ensure that only authenticated users can access certain endpoints.
- The `userController` and `twitterController` controllers handle the business logic for the respective endpoints.
- The `passport` and `Authentication` modules are not used in this code, but they could be integrated for more advanced authentication and authorization features.
