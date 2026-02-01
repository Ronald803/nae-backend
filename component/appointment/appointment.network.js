const express = require("express");
const router = express.Router();
const appointmentController = require("./appointment.controller");
const reply = require("../../utils/reply");
const validationJwtRol = require("../../utils/validationJwtRol");

router.get("/schedule", validationJwtRol(), async (req, res) => {
  try {
    const response = await appointmentController.getSchedule();
    reply.successfulGet(req, res, response);
  } catch (error) {
    reply.error(req, res, error);
  }
});

router.get("/", validationJwtRol(), async (req, res) => {
  try {
    const response = await appointmentController.getAppointments();
    reply.successfulGet(req, res, response);
  } catch (error) {
    reply.error(req, res, error);
  }
});
router.post("/", validationJwtRol(), async (req, res) => {
  try {
    const response = await appointmentController.addAppointment({
      ...req.body,
      user: req.user,
    });
    reply.successfulPost(req, res, response);
  } catch (error) {
    reply.error(req, res, error);
  }
});
router.delete("/:appointmentId", validationJwtRol(), async (req, res) => {
  try {
    const response = await appointmentController.removeAppointment(
      req.params.appointmentId,
      req.user._id
    );
    reply.successfulPost(req, res, response);
  } catch (error) {
    reply.error(req, res, error);
  }
});
module.exports = router;
