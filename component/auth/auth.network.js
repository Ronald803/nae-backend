const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const reply = require("../../utils/reply");

router.post("/login", async (req, res) => {
  try {
    const response = await authController.login(req.body);
    reply.successfulPost(req, res, response);
  } catch (error) {
    console.log(error);
    reply.error(req, res, error);
  }
});

module.exports = router;
