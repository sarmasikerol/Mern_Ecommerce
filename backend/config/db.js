const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb+srv://admin:admin@cluster11043.irpyefj.mongodb.net/mern")
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

module.exports = db;
 