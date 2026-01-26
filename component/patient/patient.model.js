const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  tutorName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Patient", mySchema);
module.exports = model;
