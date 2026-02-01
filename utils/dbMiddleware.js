const connectDB = require("../db");

const dbMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = dbMiddleware;
