const express = require("express");
const users = require("../Models/user");              

//--------- R E N D I R -- S I G N - U P -- F O R M ---------//
module.exports.Rendir_SignUp_Form = (req, res) => {
    res.render("users/signUp.ejs") // View File
}


//-------- S I G N - U P ---------- R O U T E ---------//
module.exports.SignUp_Route = async(req, res) => {
   try {
        let {username, email, password} = req.body;
        const NewUSER = new users({email, username})
        const registred_User = await users.register(NewUSER, password)
        console.log(registred_User)
        req.login(registred_User, (err) => {
            if(err) {
                return next(err)
            }
            req.flash("success", "User Was Succesfully Register")
            res.redirect("/listings")
        })
   } catch(e) {
    req.flash("error", e.message)
    res.redirect("/signup")
   }
}


//--------- R E N D I R -- L O G I N -- F O R M ---------//
    module.exports.Rendir_LogIn_Form =  (req, res) => {
        res.render("users/login.ejs")
    } 


//-------- L O G I N ---------- R O U T E ---------//
    module.exports.Login_Route = async(req, res) => {
        req.flash("success", "Welcome back!"); 
        // 1. Read from res.locals, not req.locals
        // 2. Provide a default URL (e.g., "/listings") in case it's not set
        let redirectUrl = res.locals.redirectUrl || "/listings"; // Or condiction 
        res.redirect(redirectUrl); 
    }

//-------- L O G O U T ---------- R O U T E ---------//
    module.exports.LogOut_Route = (req, res, next) => {
        req.logout((err) => {
            if(err) {
               return next(err)
            }
            req.flash("success", "You Are Logged Out!")
            res.redirect("/listings")
        })
    }