const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Model = require("../component/doctor/doctor.model");
const reply = require("./reply");

const validationJwtRol = (rol) => {
  return async (req = request, res = response, next) => {
    const token = req.header("xtoken");
    if (!token) {
      return reply.error(req, res, "");
    }
    try {
      const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      const user = await Model.findById(uid);
      if (!user || user.characteristic === "deleted") {
        return reply.disabledUser(req, res);
      }
      if (rol && user.rol !== rol) {
        return reply.noPermission(req, res);
      }
      req.user = user;
      next();
    } catch (error) {
      reply.error(req, res, error);
    }
  };
};
module.exports = validationJwtRol;
