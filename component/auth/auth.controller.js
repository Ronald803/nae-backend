const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const storeDoctor = require("../doctor/doctor.store");

const login = async ({ email, password }) => {
  if (!email || !password) throw new Error("Incomplete Data");
  //____________________ checking email exists _________________
  const users = await storeDoctor.getDoctorToAuth({ email });
  if (users.length < 1) throw new Error("Wrong information");
  const user = users[0];
  if (user.status != "active") throw new Error("Inactive account");
  //____________________ checking password is correct ___________
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) throw new Error("Wrong information");
  const payload = { uid: user._id };
  const token = jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
    expiresIn: "4h",
  });
  return {
    name: user.name,
    rol: user.rol,
    token,
  };
};

module.exports = { login };
