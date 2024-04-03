const fs = require("fs");
// sync call blocking req
fs.writeFileSync("./text.txt", "hello there");
// non blocking req
fs.writeFile("./text.txt", "hello there Async", (err) => {});
// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);

// Async
// fs.readFile("./contact.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("error");
//   } else {
//     console.log(result);
//   }
// });

fs.appendFileSync("./text.txt", new Date().getDate().toLocaleString());
