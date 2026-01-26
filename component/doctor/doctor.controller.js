const bcryptjs = require("bcryptjs");
const doctorStore = require("./doctor.store");

const addDoctor = async (newDoctor) => {
  const { name, specialty, phone, address, email, password } = newDoctor;
  if (!name || !specialty || !phone || !address || !email || !password) {
    throw new Error("Datos incompletos");
  }
  //___________________encrypting password________________
  const salt = bcryptjs.genSaltSync();
  const encryptPassword = bcryptjs.hashSync(password, salt);

  const doctor = {
    ...newDoctor,
    password: encryptPassword,
    status: "active",
    rol: "doctor",
  };
  const doctorSaved = await doctorStore.add(doctor);
  return doctorSaved;
};

const getDoctors = async (filter) => {
  const doctors = await doctorStore.list(filter, "-password");
  return doctors;
};

module.exports = { addDoctor, getDoctors };
