const express = require("express");
// const http = require("http");
const app = express();
app.get("/", (req, res) => {
  res.send("this is homepage");
});
app.get("/contact", (req, res) => {
  res.send("this is contact page" + " hey " + req.query.name);
});
// const myserver = http.createServer(app);

// myserver.listen(5500, () => console.log("server started"));
app.listen(5500, () => console.log("server started"));
