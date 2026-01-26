const DoctorModel = require("./doctor.model");

const add = async (doctor) => {
  const newDoctor = new DoctorModel(doctor);
  const doctorSaved = await newDoctor.save();
  return doctorSaved;
};
const list = async (filter, exclude = "") => {
  const doctors = await DoctorModel.find(filter, exclude).populate("specialty");
  return doctors;
};

module.exports = { add, list };
