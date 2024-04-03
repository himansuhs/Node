function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
// module.exports = add; //overwrite ho raha hai and sub ka value print ho raha hai

// module.exports = sub;
// to overcome this create a object

// module.exports = {
//   add,
//   sub,
// };
exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;
