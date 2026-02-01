const express = require("express");
const cors = require("cors");
const router = require("./routes");

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  router(app);
  return app;
};

module.exports = createApp;
