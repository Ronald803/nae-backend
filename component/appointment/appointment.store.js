const AppointmentModel = require("./appointment.model");

const add = async (appointment) => {
  const myAppointment = new AppointmentModel(appointment);
  const newAppointment = await myAppointment.save();
  return newAppointment;
};
const list = async (filter) => {
  const appointments = await AppointmentModel.find({
    ...filter,
    status: "active",
  })
    .populate({ path: "patient", select: "name" })
    .populate({
      path: "doctor",
      select: "name specialty",
      populate: { path: "specialty", select: "name" },
    });
  return appointments;
};

const remove = async (appointmentId, userId) => {
  const deletedAppointment = await AppointmentModel.findByIdAndUpdate(
    appointmentId,
    { status: "inactive", updatedBy: userId }
  );
  return deletedAppointment;
};

module.exports = { add, list, remove };
