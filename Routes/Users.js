const express = require("express");
const Router = express.Router({ mergeParams: true });
const users = require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const PassPort = require("passport");                 
const { Save_Redirect_URL } = require("../middleware");
const User_Controllers = require("../controllers/users")


//--------- S A M E -- P A T H ---- C A L L B A C K S -------| R E N D I R -- S I G N - U P -- F O R M |
    Router.route("/signup")
    .get( User_Controllers.Rendir_SignUp_Form )
    .post( wrapAsync( User_Controllers.SignUp_Route ) )


//--------- S A M E -- P A T H ---- C A L L B A C K S -------| R E N D I R -- L O G I N -- F O R M ---- L O G I N ---- R O U T E --|
 
    Router.route("/login")
    .get(User_Controllers.Rendir_LogIn_Form)
    .post( Save_Redirect_URL, // Middleware to save the URL before session is reset
        PassPort.authenticate("local", {
            failureRedirect: "/login", 
            failureFlash: true 
        }), User_Controllers.Login_Route
    );

//-------- L O G O U T ---------- R O U T E ---------//
    Router.get("/logout", User_Controllers.LogOut_Route )



module.exports = Router;