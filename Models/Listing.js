const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./Review");
const Review = require("./Review");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {

    url: String,
    filename: String

    // url: {
    //     type: String,
    //     default: "https://images.unsplash.com/photo-1753898854513-97ea15851501?q=80&w=2666&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     set: (v) => v === "" ? "https://images.unsplash.com/photo-1753898854513-97ea15851501?q=80&w=2666&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    // },
    // filename: String
  },
  price: Number,
  location: String,
  country: String,

  reviews : [
    {
      // -----Store The Object ID
      type : Schema.Types.ObjectId,
      ref : "Review"
    }
  ], 

  owner : {
    type : Schema.Types.ObjectId,
    ref : "User"
  },

   geometry :  {  // THis Is FOr COrdinates of MAp 
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});


// ---- T o ---- D e l e t e ---- ObjectID ---- F r o m ---- S h o w P a g e ----
  listingSchema.post("findOneAndDelete", async (Listing) => {
    if(Listing) {
      await Review.deleteMany( {_id : {$in : Listing.reviews}} )
    }
  } )

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;











































































// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//        type: String,
//        required: true,
//     },
//     description: String,
//     image: {
//       url: {
//         type: String,
//         default: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//         set: (v) => v === "" ? "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" : v,
//       },
//       filename: {
//         type: String,
//       },
//     },
//     // image: {
//     //   url: {
//     //     type: String,
//     //     default: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     //   },
//     //   filename: {
//     //     type: String,
//     //   }
//     // },

//     // In your Listing.js model file
//     price: Number,
//     location: String,
//     country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

// // image: {
// //   type: Object, // The type is a generic Object
// //   default: {
// //       url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
// //       filename: "defaultImage"
// //   }