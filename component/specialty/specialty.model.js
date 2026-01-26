const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SpecialtySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const SpecialtyModel = mongoose.model("Specialty", SpecialtySchema);
module.exports = SpecialtyModel;
