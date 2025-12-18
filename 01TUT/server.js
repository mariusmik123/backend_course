// node runs on a servver - not a browser
// the console is the terminal window
console.log("hello world");
// global object instead of a window object
//console.log(global);
// common core modules that we will explore:
// CommonJS modules instead of ES6 modules

const os = require("os");
const path = require("path");
/*
const math = require("./math");

console.log(math.add(2, 3));
*/

const { add, sub, mul, div } = require("./math");

console.log(add(2, 9), sub(99, 9), div(mul(5, 20), 10));

/*console.log(os.type());

console.log(os.version());

console.log(os.homedir());

console.log(__dirname);

console.log(__filename);

console.log(path.dirname(__filename));

console.log(path.basename(__filename));

console.log(path.extname(__filename));

console.log(path.parse(__filename));*/

// node is missing som js apis fx fetch --> might need to intergrate libraries to compensate
