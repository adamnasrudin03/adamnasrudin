const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const db = require("../model");
const Model = db.user;

exports.findAll = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 5;
  let totalItems;

  let accountNumber = req.query.account_number;
  let identityNumber = req.query.identity_number;

  accountNumber = accountNumber
    ? { accountNumber: { $regex: `${accountNumber}` } }
    : null;
  identityNumber = identityNumber
    ? { identityNumber: { $regex: `${identityNumber}` } }
    : null;
  const search = accountNumber || identityNumber;

  Model.find(search)
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Model.find(search)
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      const forLoop = async (_) => {
        let newData = [];

        for (let j = 0; j < result.length; j++) {
          result[j].password = " ";
          newData.push(result[j]);
        }

        res.status(200).send({
          status: "success",
          message: "Find All successfully",
          data: newData,
          total_data: totalItems,
          data_perPage: perPage,
          current_page: currentPage,
          total_page:
            Math.ceil(totalItems / perPage) == 0
              ? currentPage
              : Math.ceil(totalItems / perPage),
        });
      };

      forLoop();
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message:
          err.message || "Some errors occurred while find all users data.",
        data: null,
      });
    });
};

exports.findById = (req, res, next) => {
  const id = req.params.id;
  Model.findById(id)
    .then((dataResult) => {
      if (!dataResult) {
        const error = new Error("Data not found");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).send({
        status: "success",
        message: `Find user detail successfully`,
        data: {
          id: dataResult._id,
          accountNumber: dataResult.accountNumber,
          identityNumber: dataResult.identityNumber,
          userName: dataResult.userName,
          emailAddress: dataResult.emailAddress,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err.message || "Error retrieving student with id = " + id,
      });
    });
};

exports.updateById = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Incorrect input value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Model.findById(id)
    .then((post) => {
      if (!post) {
        const err = new Error("User Not Found");
        err.errorStatus = 404;
        throw err;
      }

      post.accountNumber = req.body.account_number;
      post.identityNumber = req.body.identity_number;
      post.username = req.body.username;
      post.email = req.body.email_address;
      post.password = bcrypt.hashSync(req.body.password, 8);

      return post.save((err, user) => {
        if (err) {
          res.status(500).send({ status: "error", message: err });
          return;
        }
      });
    })
    .then((result) => {
      res.status(200).send({
        status: "success",
        message: "Updated successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while updating User data.",
      });
    });
};

exports.deleteById = (req, res) => {
  const id = req.params.id;

  Model.findById(id)
    .then((_result) => {
      if (!_result) {
        const error = new Error(`user was not found`);
        error.errorStatus = 404;
        throw error;
      }

      return Model.findByIdAndRemove(id);
    })
    .then((result) => {
      res.send({
        status: "success",
        message: "Deleted successfully!",
        data: {
          id: result._id,
          accountNumber: result.accountNumber,
          identityNumber: result.identityNumber,
          userName: result.userName,
          emailAddress: result.emailAddress,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message:
          err.message || "Some errors occurred while deleting user data.",
      });
    });
};
