const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const storeDoctor = require("../doctor/doctor.store");

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Incomplete Data");
  }
  //____________________ checking email exists _________________
  const user = await storeDoctor.list({ email });
  if (user.length < 1) {
    throw new Error("Wrong information");
  }
  //____________________ checking password is correct ___________
  const validPassword = bcryptjs.compareSync(password, user[0].password);
  if (!validPassword) {
    throw new Error("Wrong information");
  }
  const payload = { uid: user[0]._id };
  const token = jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
    expiresIn: "4h",
  });
  return {
    name: user[0].name,
    rol: user[0].rol,
    token,
  };
};

module.exports = { login };
