const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const controller = require("../controller/userController");
const { authJwt } = require("../middleware");

router.get("/", [authJwt.verifyToken], controller.findAll);
router.get("/:id", [authJwt.verifyToken], controller.findById);
router.put(
  "/:id/update",
  [
    authJwt.verifyToken,
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password min 8 characters"),
  ],
  controller.updateById
);
router.delete("/:id/delete", [authJwt.verifyToken], controller.deleteById);

module.exports = router;
