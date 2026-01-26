const db = require("mongoose");

db.Promise = global.Promise;

async function connectDB(url) {
  await db
    .connect(url)
    .then(() => console.log("[db] Successfully conected"))
    .catch((e) => console.log("[db]", e, url));
}

module.exports = connectDB;
