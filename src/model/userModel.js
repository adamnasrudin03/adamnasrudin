const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    identityNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
