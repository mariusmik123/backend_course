const express = require("express");
const app = express();
const path = require("path");

// definerer port og hvor
const PORT = process.env.PORT || 3500;

/*        REGEX CHEAT SHEET:
^ $           start/slut
.             vilkårligt tegn
\d \w \s      shorthands
* + ? {n,m}   quantifiers
[]            character class
() |          groups / OR
i g m         flags
*/

// express allows to use regular expressions i req
app.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
  // 1. måde at send en fil:
  // res.sendFile("./views/index.html", { root: __dirname });
  // 2. måde at sende en fil:
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get(/new-page(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// redirect w express:
app.get(/oldpage(.html)?/, (req, res) => {
  // 302 status code by default, to change add arguement
  res.redirect(301, "/new-page.html");
});

// håndtere fejl get request
app.get("/*", (req, res) => {
  res.status(404).res.sendFile(path.join(__dirname, "views", "404.html"));
});

//route handlers
/* these anonymous functions er faktisk route handlers:
(req,res) => {
  res.status(404).res.sendFile(path.join(__dirname, "views", "404.html"))

  -- og det kan chaines til at bruge flere
}*/
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("hello world");
  }
);

app.listen(PORT, () => console.log("Server running on " + PORT));
