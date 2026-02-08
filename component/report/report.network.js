const express = require("express");
const router = express.Router();
const reportController = require("./report.controller");
const reply = require("../../utils/reply");
const validationJwtRol = require("../../utils/validationJwtRol");

router.get("/", validationJwtRol(), async (req, res) => {
  try {
    const reports = await reportController.getReports();
    reply.successfulGet(req, res, reports);
  } catch (error) {
    reply.error(req, res, error);
  }
});

router.post("/", validationJwtRol(), async (req, res) => {
  try {
    const newReport = await reportController.addReport({
      ...req.body,
      user: req.user,
    });
    reply.successfulPost(req, res, newReport);
  } catch (error) {
    reply.error(req, res, error);
  }
});

module.exports = router;
