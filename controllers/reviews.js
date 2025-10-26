const Listing = require("../Models/Listing")
const Review = require("../Models/Review")

//---- R E V I E W ------- R O U T E ------// 
    module.exports.Create_Reviews = async (req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.Review); // Review Come From Form show.js
        newReview.author = req.user._id
        listing.reviews.push(newReview); //------>PUSH DATA
        await newReview.save();
        await listing.save();

        req.flash("success", "New Review IS Created!")
        res.redirect(`/listings/${listing._id}`);
    }

//----- D E L E T E ---- R E V I E W ------- R O U T E --------//
    module.exports.Delete_Reviews = async (req, res) => {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);

        req.flash("success", "Review Deleted")
        res.redirect(`/listings/${id}`);
    }