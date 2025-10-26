const mongoose = require("mongoose");
const initData_______ = require("./data.js");
const LISTING = require("../Models/Listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDataBase = async () => {
  await LISTING.deleteMany({});
  initData_______.data = initData_______.data.map((obj) => ({ ...obj,
    owner: "68f8d20c2462f9a796b577eb",
    }));
  await LISTING.insertMany(initData_______.data);
  console.log("data was initialized");
};

initDataBase();