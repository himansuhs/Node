const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const { join } = require("path");
const port = 5500;
mongoose
  .connect("mongodb://localhost:27017/app-1")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));
// schema
const userSchema = new mongoose.Schema({
  firstNamw: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
const User = mongoose.model("user", userSchema);
// middleware  -plugin
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  // return res.json({ msg: "hello from middleware1" });
  console.log("middleware");
  req.myusername = "himansu";
  next();
});
app.use((req, res, next) => {
  // return res.end("hey");
  // console.log(req.myusername);
  // next();
  fs.appendFile(
    "log.txt",
    `${Date.now()}:${req.method}:${req.path}`,
    (err, data) => {
      next();
    }
  );
});
// Routes
app.get("/api/users", (req, res) => {
  // res.setHeader("myname", "himansu");

  console.log(req.headers);
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
app.post("/api/users", (req, res) => {
  //todo create a new user
  const body = req.body; //yaha data availabe ho jayega but its showing undefined
  //kiyu ki express dont know which  type of data it is for which we need a middleware
  // console.log(body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
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
