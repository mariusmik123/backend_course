const { error } = require("console");
const fs = require("fs");
const path = require("path");
const eventEmitter = require("events");

logToFile = (message) => {
  fs.appendFile(path.join(__dirname, "logs.txt"), message, "utf8", (err) => {
    if (err) {
      throw err;
      return;
    }
  });
};

class logger extends eventEmitter {
  constructor() {
    super();

    // tilføjer en eventlistener
    this.on("log", (message) => {
      logToFile(message);
    });
  }

  log(message) {
    this.emit("log", message);
  }
}

module.exports = logger;
