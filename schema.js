const Joi = require('joi');

// ------ T H I S ------ F O R ------ V A L I D A T I O N ------
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        
        // This is the corrected part
        image: Joi.object({
            url: Joi.string().allow("", null) 
        })
    }).required()
});


module.exports.reviewSchema = Joi.object({
    Review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required() 
}).required();