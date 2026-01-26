const express = require("express");
const router = express.Router();
const specialtyController = require("./specialty.controller");
const validationJwtRol = require("../../utils/validationJwtRol");
const reply = require("../../utils/reply");

router.post("/", validationJwtRol(), async (req, res) => {
  try {
    const response = await specialtyController.postSpecialty(req.body);
    reply.successfulPost(req, res, response);
  } catch (error) {
    reply.error(req, res, error);
  }
});
router.get("/", validationJwtRol(), async (req, res) => {
  try {
    const specialties = await specialtyController.getSpecialties(req.body);
    reply.successfulGet(req, res, specialties);
  } catch (error) {
    reply.error(req, res, error);
  }
});

module.exports = router;
