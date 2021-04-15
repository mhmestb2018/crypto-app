const mongoose = require("mongoose");
//shortcut to mongoose Schema
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // portfolio: [portolioSchema]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
