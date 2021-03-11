const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const db = require("./src/model");

const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 8080;
db.mongoose
  .connect("mongodb://localhost:27017/adamnasrudin")
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Connection Success", Server is running on port ${PORT}.`)
    );
  })
  .catch((err) => {
    console.log("Error  : ", err);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).send({ status: "error", message: message, data: data });
});

app.use(function (req, res, next) {
  res.status(404).send({
    status: "error",
    message: "Unable to find the requested resource!",
  });
});
