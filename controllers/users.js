const express = require("express");
const users = require("../Models/user");              

//--------- R E N D E R -- S I G N - U P -- F O R M ---------//
module.exports.Render_SignUp_Form = (req, res) => {
    res.render("users/signUp.ejs") 
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
            req.flash("success", "Welcome to StaySphere!");
            
            req.session.save(() => {
                let redirectUrl = res.locals.redirectUrl || "/listings"; 
                res.redirect(redirectUrl);
            });
        })
   } catch(e) {
        req.flash("error", e.message);
        req.session.save(() => {
            res.redirect("/signup");
        });
   }
}


//--------- R E N D E R -- L O G I N -- F O R M ---------//
module.exports.Render_LogIn_Form =  (req, res) => {
    res.render("users/login.ejs")
} 


//-------- L O G I N ---------- R O U T E ---------//
module.exports.Login_Route = async(req, res) => {
    req.flash("success", "Welcome back!"); 
    let redirectUrl = res.locals.redirectUrl || "/listings"; 
   
    req.session.save(() => {
        res.redirect(redirectUrl); 
    });
}

//-------- L O G O U T ---------- R O U T E ---------//
module.exports.LogOut_Route = (req, res, next) => {
    req.logout((err) => {
        if(err) {
           return next(err)
        }
        req.flash("error", "You have been logged out!");
        
        req.session.save(() => {
            res.redirect("/listings");
        });
    })
}