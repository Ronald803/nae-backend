const express = require("express");
const router = express.Router();
const patientController = require("./patient.controller");
const reply = require("../../utils/reply");
const validationJwtRol = require("../../utils/validationJwtRol");

router.get("/", validationJwtRol(), async (req, res) => {
  try {
    const patients = await patientController.getPatientsWithTreatments();
    reply.successfulGet(req, res, patients);
  } catch (error) {
    reply.error(req, res, error);
  }
});
router.post("/", validationJwtRol(), async (req, res) => {
  try {
    const patientSaved = await patientController.addPatient(req.body);
    reply.successfulPost(req, res, patientSaved);
  } catch (error) {
    reply.error(req, res, error);
  }
});

module.exports = router;
