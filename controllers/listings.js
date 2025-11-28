const Listing = require("../Models/Listing")

// F O R ---- M A P ---- F U N C A T I O N A L I T Y 
const mbx_Geocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbx_Geocoding({ accessToken: mapToken }); 

//------- I N D E X - - - - - - R O U T E ---------//
    module.exports.index = async (req, res) => {
        const allListings = await Listing.find({}); 
        res.render("listings/Home.ejs", { allListings });
    }

//------ S E A R C H --- R O U T E -------//
    module.exports.Search_Listings_Routes = async(req, res) => {
        const {q} = req.query;
        if(!q) {
            req.flash("error", "Please enter Something to Search!");
            return res.redirect("/listings");
        }

        const Search_RegExp = new RegExp(q, 'i');

        const allListings = await Listing.find({
            $or: [
                {title : {$regex : Search_RegExp}},
                {location : {$regex : Search_RegExp}},
                {country: {$regex : Search_RegExp}},
                {category : {$regex : Search_RegExp}}
            ]
        });

        if(allListings.length === 0 ){ 
            req.flash("error", `No listings found matching "${q}"`);
            return res.redirect("/listings");
        }

        res.render("listings/Home.ejs", { allListings }); 
    }

//------ N E W --- R O U T E -------//
    module.exports.New_Route = (req, res) => { 
        res.render("listings/form.ejs");
    }

//------ S H O W - - - - - - - R O U T E ---------//
    module.exports.Show_Listings_Route = async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id).populate({path : "reviews", populate : {path : "author"}}).populate("owner");
        if(!listing) {
            req.flash("error", "The listing you requested does not exist.")
            res.redirect("/listings")
        }
        else {
            res.render("listings/show.ejs", { listing });
        }
    }

//----- C R E A T E ---- R O U T E ------------//
module.exports.Create_Listings_Route = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
    .send();
        
    if (response.body.features.length === 0) {
        req.flash("error", "Location Not Found!");
        return res.redirect("/listings/new");
    }

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing); 
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();
    req.flash("success", "New Listing Is Created!");
    res.redirect("/listings");
}

//---- E D I T ---- R O U T E -----//
    module.exports.Edit_Route = async(req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing) {
            req.flash("error", "The listing you requested does not exist.")
            res.redirect("/listings")
        }

        let org = listing.image.url 
        org = org.replace("/upload", "/upload/w_250")
        res.render("listings/edit.ejs", {listing, org})
    }

//---- U P D A T E --- R O U T E ------//
    module.exports.Update_Route = async (req, res) => {
        if (!req.body.listing) {
            throw new ExpressError(400, "Send Valid Data For Listing ");
        }
        
        let { id } = req.params;
        let listing = await Listing.findById(id);

        Object.assign(listing, req.body.listing);

        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
        }

        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location, 
            limit: 1
        })
        .send();

        if (response.body.features.length === 0) {
            req.flash("error", "Location Not Found!");
            return res.redirect(`/listings/${id}/edit`);
        }

        listing.geometry = response.body.features[0].geometry;

        await listing.save();
        req.flash("success", "Listing updated!");
        res.redirect(`/listings/${id}`);
    };

//----- D E L E T E ---- R O U T E ---------//
    module.exports.Delete_Route = async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", "Listing Is Deleted!")
        res.redirect("/listings");
    }