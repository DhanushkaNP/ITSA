const express = require("express");
const connectToDatabase = require("./db/mongoose");
require("dotenv").config();
const app = express();
const userRouter = require("./routes/users-routes");
const eventRouter = require("./routes/events-routes");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use((err, req, res, next) => {
  if (res.headerSent) {
    next(err);
  } else {
    res.status(err.code || 500);
    res.json({ message: err.message || "An unknown error occurred!" });
  }
});

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

connectToDatabase()
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => {
    console.log(err.message);
  });
