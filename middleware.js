const Listing = require("./Models/Listing")
const ExpressError = require("./utils/ExpressError.js"); 
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./Models/Review.js");

//------- V A L I D A T E - -- -- -- - L I S T I N G ----------//
module.exports.validate_Listing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
  };

//------- V A L I D A T E - -- -- -- - L I S T I N G ----------//
   module.exports.validate_Review = (req, res, next) => {
      const { error } = reviewSchema.validate(req.body);
      if (error) {
          const errMsg = error.details.map(el => el.message).join(',');
          throw new ExpressError(400, errMsg);
      } else {
          next();
      }
  };


  module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listings!");
        return req.session.save(() => {
            res.redirect("/login");
        });
    }
    next();
}


module.exports.Save_Redirect_URL = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.IsOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.Is_Review_Author = async (req, res, next) => {
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId); 

    if (!review.author.equals(req.user._id)) { 
        req.flash("error", "You are not the author of this review."); 
        return res.redirect(`/listings/${id}`);
    }
    next();
}