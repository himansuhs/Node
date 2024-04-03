const fs = require("fs");
// blocking req
// console.log("2");
// const result = fs.readFileSync("contact.txt", "utf-8");
// console.log(result);
// console.log("21");
// non blocking req async
// console.log("2");
// fs.readFile("contact.txt", "utf-8", (err, result) => {
//   console.log(result);
// });

// console.log("21");
const os = require("os");
console.log(os.cpus().length);
