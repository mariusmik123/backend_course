const express = require("express");
const path = require("path");
const app = express();

// definerer port og hvor
const PORT = process.env.PORT || 5000;

/*        REGEX CHEAT SHEET:
^ $           start/slut
.             vilkårligt tegn
\d \w \s      shorthands
* + ? {n,m}   quantifiers
[]            character class
() |          groups / OR
i g m         flags
*/

const regex = /^A-Z?a-z+$/;

// builtin middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

/*costum middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});*/

// thirdparty middleware
const cors = require("cors"); // cors = cross origin resource sharing(skaber lowkey en public api)
const whitelist = [
  "http://www.yoursite.com",
  "http://127.0.0.1:5500" /*--> dette er locallive server*/,
  "http://localhost:5000",
];
const corsOptions = {
  origin: (requester, callback) => {
    if (whitelist.indexOf(requester) !== -1 || !requester) {
      /*!requester skal bruges i development fordi req.origin vil være undifinded*/
      callback(null, true);
    } else callback(new Error("not allowed by cors"));
  },
  optionsSuccessessStatus: 200,
};
app.use(cors(corsOptions));

// use router
app.use("/subdir", require("./routes/subdir"));

app.use("/employees", require("./routes/api/employees"));

app.get("/api/hello", (req, res) => {
  res.json({ message: "hello world" });
});

// express path patterns:
app.get("/blog/:id", (req, res) => {
  res.send("this is blog");
});

// ren regex
app.get(/new-page(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// redirect w express:
app.get(/oldpage(.html)?/, (req, res) => {
  // 302 status code by default, to change add arguement
  res.redirect(301, "/new-page.html");
});

// middleware opg:
app.get("/secret", logger, tokenCheck, (req, res) => {
  try {
    res.send("welcome");
  } catch (err) {
    console.log(err);
  }
});

function logger(req, res, next) {
  console.log(req.method, "  ", req.url);
  next();
}
function tokenCheck(req, res, next) {
  if (req.query.token !== "123") {
    return res.status(403).end();
  }
  next();
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

// uden denne starter serveren slet ikke
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
