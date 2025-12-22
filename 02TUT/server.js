const http = require("http");

const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");

// importer selvlavet function
const { EventEmitter } = require("stream");
const logEvents = require("./AdvancedCommonCoreModule");

const eventEmitter = require("events");

class Emitter extends EventEmitter {}

// initialize the object
const myEmitter = new Emitter();

// definerer port og hvor
const PORT = process.env.PORT || 3500;

// definerer server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
});

server.listen(PORT, () => console.log("Server running on " + PORT));
