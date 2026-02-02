const bcryptjs = require("bcryptjs");
const doctorStore = require("./doctor.store");

const addDoctor = async (newDoctor) => {
  const { name, specialty, phone, address, email, password } = newDoctor;
  if (!name || !specialty || !phone || !address || !email || !password) {
    throw new Error("Incomplete Data");
  }
  //___________________encrypting password________________
  const salt = bcryptjs.genSaltSync();
  const encryptPassword = bcryptjs.hashSync(password, salt);

  const doctor = {
    ...newDoctor,
    password: encryptPassword,
    status: "created",
    rol: "doctor",
    photoUrl: "123",
  };
  const doctorSaved = await doctorStore.add(doctor);
  const { name: nameSaved } = doctorSaved;
  return { name: nameSaved };
};

const getDoctors = async (filter) => {
  const doctors = await doctorStore.list(filter);
  return doctors;
};

const updateDoctors = async (doctorId, body) => {
  const { _id, status, rol, validProps } = body;
  const doctorUpdated = await doctorStore.update(doctorId, validProps);
  return doctorUpdated;
};

module.exports = { addDoctor, getDoctors, updateDoctors };
