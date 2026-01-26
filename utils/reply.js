exports.successfulGet = (req, res, body) => {
  res.status(200).send({
    body,
  });
};

exports.successfulPost = (req, res, body) => {
  res.status(201).send({
    body,
  });
};

exports.error = (req, res, details) => {
  res.status(500).send({
    message: "Something went wrong",
    body: {
      error: details,
    },
  });
};

exports.failedLogin = (req, res) => {
  res.status(400).send({
    message: "The user or the password is incorrect",
  });
};

exports.disabledUser = (req, res) => {
  res.status(401).send({
    message: "User disabled",
  });
};

exports.noPermission = (req, res) => {
  res.status(401).send({
    message: "No permission",
  });
};
