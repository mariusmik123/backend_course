const http = require("http");

const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");

// importer selvlavet function
const { EventEmitter } = require("stream");
const logEvents = require("./AdvancedCommonCoreModule");

const eventEmitter = require("events");
const { text } = require("stream/consumers");

class Emitter extends EventEmitter {}

// initialize the object
const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));
// definerer port og hvor
const PORT = process.env.PORT || 3500;

// function to serve file
const serveFile = async (filepath, contentType, response) => {
  try {
    // læser fil
    const rawData = await fsPromises.readFile(
      filepath,
      // håndtere med "" at image også læses korrekt
      !contentType.includes("image") ? "utf8" : ""
    );
    // bruger ternary opperation til at håndtere evt json data
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filepath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);

    myEmitter.emit("log", `${err.name}\t${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

// definerer server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/js";
      break;

    case ".json":
      contentType = "application/json";
      break;

    case ".jpg":
      contentType = "image/jpeg";
      break;

    case ".png":
      contentType = "image/png";
      break;

    case ".txt":
      contentType = "text/plain";
      break;

    default:
      contentType = "text/html";
  }

  let filepath;

  // tjekker hvor requesten burde være
  if (contentType === "text/html" && req.url === "/")
    filepath = path.join(__dirname, "veiws", "index.html");
  else if (contentType === "text/html" && req.url.slice(-1) === "/")
    filepath = path.join(__dirname, "veiws", req.url, "index.html");
  else if (contentType === "text/html")
    filepath = path.join(__dirname, "views", req.url);
  // hvis ingen af de ovenstående er er rigtig bruger vi bare request url --> fordi det kunne være js, css eller noget andet specificeret
  else filepath = path.join(__dirname, req.url);

  // hvis request ikke indholder nogle extension, men f.eks var request for 'new-page' så ændrer vi det bare til 'new-page.html
  if (!extension && req.url.slice(-1) !== "/") {
    filepath += ".html";
  }

  const fileExists = fs.existsSync(filepath);

  if (fileExists) {
    // serve fil hvis findes
    serveFile(filepath, contentType, res);
  } else {
    //301 = permanent flytteet browser skifter automatisk
    switch (path.parse(filepath).base) {
      case "old-page.html":
        res.writeHead(301, { location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { location: "/" });
        res.end();
        break;
      // serve a 404 response
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => console.log("Server running on " + PORT));
