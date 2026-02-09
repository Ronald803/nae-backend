const express = require("express");
const router = express.Router();
const doctorController = require("./doctor.controller");
const reply = require("../../utils/reply");
const validationJwtRol = require("../../utils/validationJwtRol");

router.get("/login", async (req, res) => {
  try {
    const doctorsLoginData = await doctorController.getDoctorsLoginData();
    reply.successfulGet(req, res, doctorsLoginData);
  } catch (error) {
    reply.error(req, res, error);
  }
});
router.get("/", validationJwtRol(), async (req, res) => {
  try {
    const doctors = await doctorController.getDoctorsWithPatients();
    reply.successfulGet(req, res, doctors);
  } catch (error) {
    reply.error(req, res, error);
  }
});
router.post("/", async (req, res) => {
  try {
    const doctorSaved = await doctorController.addDoctor(req.body);
    reply.successfulPost(req, res, doctorSaved);
  } catch (error) {
    reply.error(req, res, error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const doctorUpdated = await doctorController.updateDoctors(
      req.params.id,
      req.body
    );
    reply.successfulPost(req, res, doctorUpdated);
  } catch (error) {
    console.log(error);
    reply.error(req, res, error);
  }
});
module.exports = router;
