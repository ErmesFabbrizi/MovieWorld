const mongoose = require("mongoose");
module.exports = mongoose.model("Watchlist", new mongoose.Schema({
  userId: String,
  movies: [Object]
}));