const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Passport_Local_Mongoose = require("passport-local-mongoose");



const user_Schema = new Schema({
    email : {
        type : String,
        required : true
    }
    // Passport Local Mongoose Is USername ANd Password Automatic Define 
})

user_Schema.plugin(Passport_Local_Mongoose);  // (hash & salt) fields automatically.

module.exports = mongoose.model('User', user_Schema);


