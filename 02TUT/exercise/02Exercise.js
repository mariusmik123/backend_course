// tilføjer nødvendige commoncore modules
const http = require("http");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");

// tilføjer local modules
const Logger = require("./logger.js");

const logger = new Logger();

// initialisere porten til den allerede givende port entry eller 3000
const PORT = process.env.PORT || 3000;

// Content type decider
function getContentType(extension) {
  switch (extension) {
    case ".js":
      return "text/js";
    case ".json":
      return "application/json";
    case ".jpg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".txt":
      return "text/plain";
    default:
      return "text/html";
  }
}

// servefil async func
async function serveFile(file, response) {
  try {
    const ext = path.extname(file);
    const contentType = getContentType(ext);
    let data = await fsPromises.readFile(
      file,
      !contentType.includes("image") ? "utf8" : ""
    );

    // whrite header til http response
    response.writeHead(file.includes("404") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(data);
  } catch (error) {
    response.statusCode = 500;
    response.end("server error");
  }
}

//Creates Server: --> indeholder en requestfunction som bliver kørt ved hver eneste request til server
const server = http.createServer((req, res) => {
  //redirect først
  if (req.url === "/old") {
    res.writeHead(301, { location: "/" });
    return res.end();
  }

  const viewFiles = new Map();
  viewFiles.set(".html", "index.html");
  viewFiles.set("/about.html", "about.html");

  let url = req.url;
  if (req.url.endsWith("/")) {
    url = req.url.slice(0, -1);
    url += ".html";
  }

  const file = viewFiles.get(url) || "404.html";

  let filepath = path.join(__dirname, "views2", file);
  res.statusCode = 200;

  serveFile(filepath, res);
  logger.log(
    `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}\t${req.method}\treq:${
      req.url
    }\tres ${res.statusCode}\t${filepath}\n\n`
  );
});

//.listen()
server.listen(PORT, () => console.log("server running on ", PORT));
