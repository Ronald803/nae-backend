const express = require("express");

const app = express();
app.use("/", async (req, res) => {
  res.send("hello world from nae");
});
app.listen(3000, () => {
  console.log("listening on port 3000");
});
