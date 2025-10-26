const Listing = require("../Models/Listing")

// F O R ---- M A P ---- F U N C A T I O N A L I T Y 
const mbx_Geocoading = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbx_Geocoading({ accessToken: mapToken }); // Use mbx_Geocoading here

//------- I N D E X - - - - - - R O U T E ---------//
    module.exports.index = async (req, res) => {
        const allListings = await Listing.find({}); 
        // console.logf(allListings); // <-- ADD THIS LINE TO DEBUG
        res.render("listings/Home.ejs", { allListings });
    }


//------ N E W --- R O U T E -------//
    module.exports.New_Route = (req, res) => { // isLoggedIn middleware is imported from other file 
        // console.log(req.user)
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
        console.log(listing)
    }


//----- C R E A T E ---- R O U T E ------------//
    module.exports.Create_Listings_Route = async (req, res, next) => {

       let respone = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
          })
            .send()
            // console.log(respone.body.features[0].geometry); // type: 'Point', coordinates: [ 77.20877, 28.613928 ] }       
        let url = req.file.path
        let filename = req.file.filename
        // console.log("URL", url, "         .FIlename--", filename)
        const newListing = new Listing(req.body.listing);
        // console.log(req.user)
        newListing.owner = req.user._id
        newListing.image = {url, filename}

        newListing.geometry = respone.body.features[0].geometry  // FOr Map geometry
        let save = await newListing.save();
        console.log(save) 
        req.flash("success", "New LIsting IS Created!")
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

        let org = listing.image.url  // org menas original url
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

        await listing.save();

        req.flash("success", "Listing IS Updated!");
        res.redirect(`/listings/${id}`);
    };

//----- D E L E T E ---- R O U T E ---------//
    module.exports.Delete_Route = async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        // console.log(deletedListing);
        req.flash("success", "LIsting IS DELETED!")
        res.redirect("/listings");
    }