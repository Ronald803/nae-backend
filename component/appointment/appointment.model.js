const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, "Patient Id is required"],
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: [true, "Doctor Id is required"],
  },
  day: {
    type: String,
    required: true,
  },
  startHour: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const model = mongoose.model("Appointment", mySchema);
module.exports = model;
