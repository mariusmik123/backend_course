const http = require("http");
const { json } = require("stream/consumers");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Jeg fatter intet!!!!!");
  //res.writeHead(200, { "Content-Type": "application/json" });
  //res.end(JSON.stringify(http));
});

server.listen(3000, () => {
  console.log("Server kører på http://localhost:3000");
});
