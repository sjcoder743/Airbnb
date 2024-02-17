const mongoose = require("mongoose");
const initData = require("./data.js");
const modelListing = require("../models/listing.js");

main()
  .then((res) => {
    res = "Connected to database succefull";
    console.log(res);
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");
}

const initDb = async () => {
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "65c364677ab750da5a095655",
  }));
  await modelListing.insertMany(initData.data);
  console.log("Data was initilized");
};

initDb();
