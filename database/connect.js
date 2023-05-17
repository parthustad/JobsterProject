const mongoose = require("mongoose");

const connect = (url) => {
  console.log("url " + url);
  mongoose.connect(url);
};

module.exports = connect;
