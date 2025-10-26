const express = require("express"); 
const Router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Error Handling 
const ExpressError = require("../utils/ExpressError.js"); 
const {listingSchema, reviewSchema} = require("../schema.js")
const Listing = require("../Models/Listing.js"); // Imports the Mongoose model for our "Listing" data structure.

//--------------- P A R T -- 3 ---------------------------------------------//
  const ListingController = require("../controllers/listings.js") //--Divide Any Concore
  const multer  = require('multer')
  const { storage } = require("../cloudConfig.js")
  const upload = multer({ storage })
//--------------------------------------------//


// Login Middleware 
const { validate_Listing, isLoggedIn, IsOwner} = require("../middleware.js")

    //-- S A M E -- P A T H ---- C A L L B A C K S -------| I N D E X -- OR -- C R E A T E ---- R O U T E --|
    Router.route("/")
    .get(wrapAsync(ListingController.index))
    .post(
      isLoggedIn,
      upload.single('listing[image]'), // <-- Add Multer middleware here
      validate_Listing,
      wrapAsync(ListingController.Create_Listings_Route)
    //   res.send(req.file) {}
    );


    //------ N E W --- R O U T E -------//
    Router.get("/new", isLoggedIn, ListingController.New_Route );


    //-- S A M E -- P A T H ---- C A L L B A C K S -------| S H O W -- OR -- U P D A T E ---- R O U T E --|
    Router.route("/:id")
    .get( wrapAsync ( ListingController.Show_Listings_Route ) )
    .put( isLoggedIn, IsOwner, upload.single('listing[image]'), validate_Listing, wrapAsync (ListingController.Update_Route))
    .delete(isLoggedIn, IsOwner, wrapAsync ( ListingController.Delete_Route) )  // First Check USER is Login Or Not   Check Listing Is Valid Or Not 


    //---- E D I T ---- R O U T E -----//
    Router.get("/:id/edit", isLoggedIn, IsOwner ,wrapAsync ( ListingController.Edit_Route) )


module.exports = Router







//___________________________________________________________________________________________________________________________________________________________________________________________
//_________________ F o r _______ U n d e r s t a n d i n g _________________


    //------- I N D E X - - - - - - R O U T E ---------//
    // Router.get("/", wrapAsync (ListingController.index));


    //----- C R E A T E ---- R O U T E ------------//
    // Router.post("/", isLoggedIn, validate_Listing, wrapAsync( ListingController.Create_Listings_Route ));


    //------ S H O W - - - - - - - R O U T E ---------//
    // Router.get("/:id", wrapAsync ( ListingController.Show_Listings_Route ) );


    //---- U P D A T E --- R O U T E ------//
    // Router.put("/:id", isLoggedIn, IsOwner, validate_Listing, wrapAsync (ListingController.Update_Route));


    //----- D E L E T E ---- R O U T E ---------//
    // Router.delete(isLoggedIn, IsOwner, wrapAsync ( ListingController.Delete_Route) );










    //     //------- I N D E X - - - - - - R O U T E ---------//
    // Router.get("/listings", wrapAsync (async (req, res) => {
    //     const allListings = await Listing.find({}); 
    //     // console.logf(allListings); // <-- ADD THIS LINE TO DEBUG
    //     res.render("listings/Home.ejs", { allListings });
    // }));

    // //------ N E W --- R O U T E -------//
    // Router.get("/listings/new", (req, res) => {
    // res.render("listings/form.ejs");
    // });

    // //------ S H O W - - - - - - - R O U T E ---------//
    // Router.get("/listings/:id", wrapAsync (async (req, res) => {
    // let { id } = req.params;
    // const listing = await Listing.findById(id).populate("reviews");
    // res.render("listings/show.ejs", { listing });
    // } ) );

    // //----- C R E A T E ---- R O U T E ------------//
    // /*  Router.post("/listings", async (req, res, next) => {
    //     let {title, description, image, price, country, location} = req.body;
    //     ---- O R ----
    //     if(!req.body.listing) {
    //     throw new ExpressError(400, "Send Valid Data For Listing " )
    //     }
    //     try {
    //     const newListing = new Listing(req.body.listing);
    //     await newListing.save();
    //     res.redirect("/listings");
    //     } catch(err) {
    //     next(err);
    //     }
    // }); */
    // // ----------- 0 ----- R ------------ 
    // Router.post("/listings",validate_Listing, wrapAsync(async (req, res, next) => {
    //     const newListing = new Listing(req.body.listing);
    //     await newListing.save();
    //     res.redirect("/listings");
    // }));

    // //---- E D I T ---- R O U T E -----//
    // Router.get("/listings/:id/edit",wrapAsync(async(req, res) => {
    // let { id } = req.params;
    // const listing = await Listing.findById(id);
    // res.render("listings/edit.ejs", {listing})
    // }) )

    // //---- U P D A T E --- R O U T E ------//
    // Router.put("/listings/:id", validate_Listing, wrapAsync (async (req, res) => {
    //     if(!req.body.listing) {
    //         throw new ExpressError(400, "Send Valid Data For Listing " )
    //     }
    //     let { id } = req.params;
    //     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    //     res.redirect(`/listings/${id}`);
    // }) );


    // //----- D E L E T E ---- R O U T E ---------//
    // Router.delete("/listings/:id", wrapAsync (async (req, res) => {
    //     let { id } = req.params;
    //     let deletedListing = await Listing.findByIdAndDelete(id);
    //     // console.log(deletedListing);
    //     res.redirect("/listings");
    //     }) );


    //     module.exports = Router

    //------------ I M P O R T S ------------ - - - - - - - - - ------------//
