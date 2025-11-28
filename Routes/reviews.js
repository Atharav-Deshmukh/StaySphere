const express = require("express");
const Router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js"); // Error Handling 
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../Models/Review.js");
const Listing = require("../Models/Listing.js"); 
const { validate_Review, isLoggedIn, Is_Review_Author } = require("../middleware.js");
const Review_Controller = require("../controllers/reviews.js");


//---- R E V I E W ------- R O U T E ------// Project Pase 2 |
    // Check if user is logged in *before* validating the review
    Router.post("/", isLoggedIn, validate_Review, wrapAsync( Review_Controller.Create_Reviews ));

//----- D E L E T E ---- R E V I E W ------- R O U T E --------//
   Router.delete("/:reviewId", isLoggedIn, Is_Review_Author, wrapAsync( Review_Controller.Delete_Reviews));

module.exports = Router;