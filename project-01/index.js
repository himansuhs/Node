const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const { join } = require("path");
const port = 5500;
// connection
mongoose
  .connect("mongodb://localhost:27017/gh")
  .then(() => console.log("mongodb connceted"))
  .catch((err) => console.log("mongi error", err));

//schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
});
// model
const User = mongoose.model("user", userSchema);

// middleware  -plugin
app.use(express.urlencoded({ extended: false }));
// Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.get("/users", (req, res) => {
  const html = `
  <ul>${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`;
  res.send(html);
});
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});
app.post("/api/users", async (req, res) => {
  //todo create a new user
  const body = req.body; //yaha data availabe ho jayega but its showing undefined
  //kiyu ki express dont know which  type of data it is for which we need a middleware
  // console.log(body);
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.jobTitle,
  });
  console.log(result);
  return res.status(201).json({ msg: "success" });
});
app.patch("/api/users/:id", (req, res) => {
  //todo edit the user with id
  return res.json({ status: "pending" });
});
app.delete("/api/users/:id", (req, res) => {
  //todo delete the user with id
  return res.json({ status: "pending" });
});
// another way to write the handler
// app
//   .route("/api/users/:id")
//   .get((req, res) => {})
//   .put((req, res) => {});
app.listen(port, () => console.log("server started"));
