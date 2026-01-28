const DoctorModel = require("./doctor.model");

const add = async (doctor) => {
  const newDoctor = new DoctorModel(doctor);
  const doctorSaved = await newDoctor.save();
  return doctorSaved;
};
const list = async (filter) => {
  const doctors = await DoctorModel.find(filter).populate("specialty");
  return doctors;
};
const update = async (doctorId, body) => {
  const updatedDoctor = await DoctorModel.findByIdAndUpdate(
    doctorId,
    {
      ...body,
      status: new Date(),
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedDoctor;
};
module.exports = { add, list, update };
