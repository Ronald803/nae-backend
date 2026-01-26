const PatientModel = require("./patient.model");

const add = async (patient) => {
  const newPatient = new PatientModel(patient);
  const savedUser = await newPatient.save();
  return savedUser;
};
const list = async (filter) => {
  const patients = await PatientModel.find(filter);
  return patients;
};

module.exports = { add, list };
