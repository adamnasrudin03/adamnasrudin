const { validationResult } = require("express-validator");
const config = require("../config/authConfig");

const db = require("../model");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  const accountNumber = req.body.account_number;
  const identityNumber = req.body.identity_number;
  const userName = req.body.username;
  const emailAddress = req.body.email_address;
  const password = bcrypt.hashSync(req.body.password, 8);

  if (!errors.isEmpty()) {
    const err = new Error("Incorrect input value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (
    !accountNumber ||
    !identityNumber ||
    !userName ||
    !emailAddress ||
    !password
  ) {
    const err = new Error("Data cannot be empty!");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const user = new User({
    accountNumber: accountNumber,
    identityNumber: identityNumber,
    userName: userName,
    emailAddress: emailAddress,
    password: password,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err,
        data: null,
      });
      return;
    }
    res.send({
      status: "success",
      message: "User was registered successfully!",
      data: {
        id: user._id,
        accountNumber: user.accountNumber,
        identityNumber: user.identityNumber,
        userName: user.userName,
        emailAddress: user.emailAddress,
      },
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    emailAddress: req.body.email_address,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ status: "error", message: err });
      return;
    }

    if (!user) {
      return res
        .status(404)
        .send({ status: "error", message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        status: "error",
        message: "Invalid Password!",
        accessToken: null,
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      status: "success",
      message: "Login successfuly",
      data: {
        id: user._id,
        userName: user.userName,
        emailAddress: user.emailAddress,
        accessToken: token,
      },
    });
  });
};
