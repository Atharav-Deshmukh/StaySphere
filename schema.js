/*
* FILE: Airbnb/schema.js
* FIX: Changed 'review: Joi.object' to 'Review: Joi.object' to match your form.
*/
const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string().allow("", null),
            filename: Joi.string().allow("", null)
        }).optional(),
        category: Joi.string().required() 
    }).required()
});

// --- THIS IS THE FIX ---
// The schema now expects "Review" (uppercase R)
module.exports.reviewSchema = Joi.object({
    Review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});