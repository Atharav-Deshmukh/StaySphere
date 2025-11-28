if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");                             // Imports Mongoose, a library to interact with a MongoDB database.
const path = require("path");                                     // Imports Node.js's built-in 'path' module to handle file paths.
const methodOverride = require("method-override");                // Imports a middleware to use HTTP verbs like PUT or DELETE in places where the client doesn't support it.
const Ejs_Mate = require("ejs-mate")                              // Imports 'ejs-mate' to allow for layouts and partials with EJS.
const session = require("express-session")
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

// ------------ I N I T I A L I Z A T I O N ------------ //
  const app = express();

// P A R T - 3 -----------------------------------------|
  const PassPort = require("passport");                 
  const Local_Strategy = require("passport-local");
  const User_s = require("./Models/user.js");  //<--------|

  const ExpressError = require("./utils/ExpressError.js"); 
  const Review = require("./Models/Review.js");

//-- I M P O R T --- F R O M --- R O U T E S --- F I L E ---//
  const Listing_File_Routes = require("./Routes/listings.js");
  // FIX 1: Changed "./Routes/Routes.js" to "./Routes/reviews.js"
  const Review_File_Routes = require("./Routes/reviews.js"); 
  const User_Routes = require("./Routes/Users.js");

//------------ M I D D L E W A R E  -&-  C O N F I G U R A T I O N ------------//
//- EJS Setup
  app.set("view engine", "ejs"); 
  app.set("views", path.join(__dirname, "views")); 
  app.engine('ejs', Ejs_Mate); //------------------------->

  //- Request Body & Method Override
  app.use(express.urlencoded({ extended: true })); 
  app.use(methodOverride("_method")); 

  //- Static Files (CSS, JS)
  app.use(express.static(path.join(__dirname, "public"))); 

/*_____________________________________________________________________________________________
----------- D A T A B A S E   C O N N E C T I O N ------------ - - - - - - - - - ------------*/

  const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

  const FIRST_DB_URL = process.env.ATLAS_DB_ONE_URL;
  const SECOND_DB_URL = process.env.ATLAS_DB_TWO_URL;

  async function main() {
    await mongoose.connect(SECOND_DB_URL);
  }

  main()
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });

//_____________________________________________________________________________________________


//-- S e s s i o n -- C o n f i g u r a t i o n ------------------>

  const store =  MongoStore.create({
    mongoUrl: SECOND_DB_URL, 
    crypto : {
      secret:process.env.SECRET_STRING
    },
    touchAfter: 24*3600,
    
  } )

  store.on("error", (err) => { // Added 'err' parameter to log
   console.log("ERROR in MONGO SESSION STORE", err);
  });

  const session_OPTION = {
      store,
      secret : process.env.SECRET_STRING,
      resave: false,
      saveUninitialized: true,
      cookie: {
        // Expire In 7 Days - 24 Hours - 6 Min - 60 Sec - 1000 Ms
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
      }
  };

/*-- A U T H E N T I C A T I O N & S E S S I ON --- M I D D L E W A R E ------ - - - - ---------> */
  app.use(session(session_OPTION));                        // Set up express-session to track user login status
  app.use(flash());                                        // Initialize connect-flash for one-time messages (e.g., success/error alerts)

  
  app.use(PassPort.initialize());                          // Initialize Passport.js for authentication
  app.use(PassPort.session());                             // Allow Passport to use sessions to maintain a persistent login (remembering the user between pages)
  PassPort.use(new Local_Strategy(User_s.authenticate()));   // Tell Passport to use the Local Strategy (username/password) for authentication

  PassPort.serializeUser(User_s.serializeUser());          // Stores a user's ID in the session after they log in
  PassPort.deserializeUser(User_s.deserializeUser());      // Fetches the full user data from the database using the ID from the session (on every request)


  // This middleware makes flash messages and user status available in *all* templates
  app.use((req, res, next) => {
      res.locals.success = req.flash("success");           // Get the 'success' flash message (if it exists) and pass it to templates
      res.locals.error = req.flash("error");               // Get the 'error' flash message (if it exists) and pass it to templates
      res.locals.currUser = req.user;                      // Pass the currently logged-in user (if they exist) to all templates as 'currUser'
      next();
});

/*-- R O U T E S --------------------------------------------------------------------------------------------------->
  -- L i s t i n g s --- R o u t e s ------ - - - - ---------> */

  app.use("/listings", Listing_File_Routes);

  /*-- R e v i e w s --- R o u t e s ------ - - - - ---------->  */
  
  app.use("/listings/:id/reviews", Review_File_Routes); 

  /*- U S E R --- R O U T E ------ - - - - ----------- - - - ->  */

  app.use("/", User_Routes); 

  /*- U S E R I N F O--- R O U T E S ------ - - - - ----------- - - - ->  */
   
  app.get("/userinfo", (req, res) => {
    // You need to include the 'users' folder in the path
    res.render("users/userInfo.ejs", { currentUser: req.user });
});
  
/*------------ E R R O R   H A N D L I N G ------------ - - - - - - - - - ------------//

  404 Not Found */
  app.use((req, res, next) => { 
    next(new ExpressError(404, "Page Not Found!"))
  });

  //- Generic Error Handler
  app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("err.ejs", {message});
  });

//------------ S E R V E R   S T A R T ------------ - - - - - - - - - ------------//

// Use process.env.PORT if available, otherwise default to 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
});