const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialty",
    required: [true, "Specialty Id is required"],
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
});
const model = mongoose.model("Doctor", mySchema);
module.exports = model;
