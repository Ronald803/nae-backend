const appointmentStore = require("./appointment.store");
const appointmentUtils = require("./appointment.utils");

const addAppointment = async (newAppointment) => {
  const { patient, doctor, startHour, day, user } = newAppointment;
  if (!patient || !doctor || !startHour || !day) {
    throw new Error("Datos incompletos");
  }
  const appointment = {
    patient,
    doctor,
    startHour,
    day,
    status: "active",
    createdBy: user._id,
    updatedBy: user._id,
  };
  const appointmentSaved = await appointmentStore.add(appointment);
  return appointmentSaved;
};

const getAppointments = async (filter) => {
  const appointments = await appointmentStore.list(filter);
  return appointments;
};

const getSchedule = async () => {
  const appointments = await appointmentStore.list();
  const schedule = appointmentUtils.shapeSchedule(appointments);
  return schedule;
};

const removeAppointment = async (appointmentId, userId) => {
  const deletedAppointment = await appointmentStore.remove(
    appointmentId,
    userId
  );
  return deletedAppointment;
};

module.exports = {
  addAppointment,
  getAppointments,
  getSchedule,
  removeAppointment,
};
