const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: [true, "Appointment Id is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    status: {
      type: String,
      required: true,
    },
    progressNote: {
      type: String,
      required: [true, "Progress note is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    paidByThePatient: {
      type: Boolean,
      required: true,
    },
    paidToTheTherapist: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mySchema.index({ appointment: 1, date: 1 }, { unique: true });

const model = mongoose.model("Report", mySchema);
module.exports = model;
