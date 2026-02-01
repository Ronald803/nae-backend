const authNetwork = require("./component/auth/auth.network");
const appointmentNetwork = require("./component/appointment/appointment.network");
const specialtyNetwork = require("./component/specialty/specialty.network");
const staffNetwork = require("./component/doctor/doctor.network");
const patientNetwork = require("./component/patient/patient.network");

const routes = (server) => {
  server.use("/api/auth", authNetwork);
  server.use("/api/appointment", appointmentNetwork);
  server.use("/api/patient", patientNetwork);
  server.use("/api/specialty", specialtyNetwork);
  server.use("/api/staff", staffNetwork);
  server.use("/hello_world", async (req, res) => {
    res.send("hello world from nae");
  });
};

module.exports = routes;
