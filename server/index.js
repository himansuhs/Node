const http = require("http");
const fs = require("fs");
const url = require("url");
const myserver = http.createServer((req, res) => {
  const log = `${Date.now()} ${req.method}${req.url}:req recived\n`;
  const myurl = url.parse(req.url, true);
  console.log(myurl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myurl.pathname) {
      case "/":
        res.end("this is home");
        break;
      case "/contact":
        const qp = myurl.query.name;
        res.end(`my name is ${qp}`);
    }
  });
}); // responsible for handling the incoming req
myserver.listen(5500, () => console.log("server started"));
