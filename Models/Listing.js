const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const review = require("./Review");  <-- REMOVE THIS LINE
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
  },
  price: Number,
  location: String,
  country: String,

  reviews: [
    {
      // -----Store The Object ID
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  geometry: {  // THis Is FOr COrdinates of MAp
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    // <-- CATEGORY HAS BEEN MOVED FROM HERE
  },

  // --- CATEGORY SHOULD BE HERE (at the top level) ---
  category: {
    type: String,
    enum: [
      "trending",
      "rooms",
      "cities",
      "mountains",
      "castles",
      "pools",
      "camping",
      "farms",
      "domes",
      "boats",
      "beach",     
      "treehouse",  
      "lakefront",  
      "desert"
    ]
  }
});

// ---- T o ---- D e l e t e ---- ObjectID ---- F r o m ---- S h o w P a g e ----
listingSchema.post("findOneAndDelete", async (listing) => { // Renamed parameter to 'listing' (lowercase) for clarity
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } })
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;