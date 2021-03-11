const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const controller = require("../controller/authController");
const db = require("../model");
const Model = db.user;
router.post(
  "/register",
  [
    body("email_address")
      .isEmail()
      .withMessage("Enter the appropriate email format")
      .custom((value, { req }) => {
        return Model.findOne({ emailAddress: value }).then((res) => {
          if (res) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password min 8 characters"),
  ],
  controller.signup
);

router.post("/login", controller.signin);
module.exports = router;
