const patientStore = require("./patient.store");

const addPatient = async (newPatient) => {
  let { name, birthday, phone, address, tutorName, diagnosis } = newPatient;
  if (!name || !birthday || !phone || !address || !tutorName) {
    throw new Error("Datos incompletos");
  }
  diagnosis = !diagnosis ? "Pendiente..." : diagnosis;
  const patient = { ...newPatient, diagnosis, status: "active" };
  const savedPatient = await patientStore.add(patient);
  return savedPatient;
};

const getPatients = async (filter) => {
  const patients = await patientStore.list(filter);
  return patients;
};

const getPatientsWithTreatments = async (filter) => {
  const patients = await patientStore.listPatientsWithTreatments(filter);
  return patients;
};

module.exports = { addPatient, getPatients, getPatientsWithTreatments };
