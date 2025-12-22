// importer selvlavet function
const { EventEmitter } = require("stream");
const logEvents = require("./AdvancedCommonCoreModule");

/*
for (let i = 0; i < 10; i++) {
  console.log(i + "\t");
  logEvents("testing");
}
*/

const eventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// initialize the object
const myEmitter = new MyEmitter();

// add an listener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  // emit event
  myEmitter.emit("log", "Log event emitted");
}, 2000);
