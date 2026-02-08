const reportStore = require("./report.store");

const addReport = async (report) => {
  const { appointmentId, date, progressNote, user } = report;
  if (!appointmentId || !date || !progressNote || !user) {
    throw new Error("Datos incompletos");
  }
  const newReport = {
    appointment: appointmentId,
    date,
    progressNote,
    status: "completed",
    paidByThePatient: false,
    paidToTheTherapist: false,
    createdBy: user._id,
    updatedBy: user._id,
  };
  const savedReport = await reportStore.add(newReport);
  return savedReport;
};

const getReports = async (filter) => {
  const reports = await reportStore.list(filter);
  return reports;
};

module.exports = { addReport, getReports };
