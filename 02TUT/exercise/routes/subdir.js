const express = require("express");
const router = express.Router();
const path = require("path");

// disse er higher order functions som returnere en anden funktion som kan huske de tidligere argumenter som file.
/*const handler = (file) => (req, res) =>
  res.sendFile(path.join(__dirname, "..", "views", "subdir", file));*/
function handler(file) {
  return (req, res) => {
    res.sendFile(path(__dirname, "..", "views", "subdir", file));
  };
}

router.get("/", handler("index.html"));
router.get("/index", handler("index.html"));
router.get("/index.html", handler("index.html"));

router.get("/test.html", handler("test.html"));

module.exports = router;
