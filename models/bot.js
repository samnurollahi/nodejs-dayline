const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  hamShahri: {
    type: Boolean,
  },
  irna: {
    type: Boolean,
  },
  isna: {
    type: Boolean,
  },
  mashregh: {
    type: Boolean,
  },
  khabarOnline: {
    type: Boolean,
  }
});



module.exports = mongoose.model("bot", Schema)