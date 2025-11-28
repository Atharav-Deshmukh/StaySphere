const mongoose = require("mongoose");
const initData_______ = require("./data.js");
const LISTING = require("../Models/Listing.js");
const User = require("../Models/user.js"); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
    initDataBase();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDataBase = async () => {
  // 1. Find a valid user to be the owner
  const owner = await User.findOne({});
  
  if (!owner) {
    console.log("ERROR: No users found in database. Please register a user on the website first, then run this script.");
    process.exit(1); 
  }

  // 2. Clear old data
  await LISTING.deleteMany({});

  // 3. Assign the found user's ID to all sample listings
  initData_______.data = initData_______.data.map((obj) => ({ 
    ...obj,
    owner: owner._id, 
  }));

  // 4. Insert new data
  await LISTING.insertMany(initData_______.data);
  console.log(`Data initialized. Owner assigned: ${owner.username}`);
};