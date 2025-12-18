// lærer fs til at write og læse  og append til filer

const fs = require("fs");

//////////////////////////////////    READ FILES   //////////////////////////////
// syntax ->  fs.readFile(path, options, callback);
fs.readFile(
  "readme.md",
  /*"utf8"*/ (err, data) => {
    if (err) throw err;
    // console.log(data.toString() /* hvis ikke tostring() så får man buffer når ingen encoder(utf8)*/ );
  }
);
// ^^^^^^^^^^^^^readFile er async tho

////////////////////////////        WRITE TO FILES       /////////////////////////////////////
const TESTDATA = "dette er mit indsættende data";
const NEWFILE = "newFile.txt";
//syntax --> fs.writeFile(file, data, options, callback);
fs.writeFile(NEWFILE, TESTDATA, "utf8", (err) => {
  if (err) {
    throw err;
    return;
  }
  //console.log("write done");
});

/////////////////////////////        APPEND TO FILE    //////////////////////////////////
// fs.appendFile kan både lave en ny fil og tilføje til den eller appende til eksisterende fil
fs.appendFile("newFile.txt", "\n\n new line append", "utf8", (err) => {
  if (err) {
    throw err;
    console.log("Error: ", err);
    return;
  }
  //console.log("appending done - uafhængig af write");
});

/////     både read, write and append i async derfor burde afhænig kode være call back eller promise
fs.readFile("readme.md", "utf8", (err, data) => {
  if (err) {
    throw err;
    return;
  }
  let user = data.trim(); // tostring er faktisk ikke nødvendigt når encoding = 'utf8'
  //console.log(user);
  if (user === "marius") {
    fs.appendFile("readme.md", "\nsejr", "utf8", (err) => {
      if (err) {
        throw err;
        return;
      }
      console.log("sejr noteret");
    });
  } else {
    //console.log("sejr ikke noteret");
  }
});

//////////////// --------------  HOW TO USE PATH MODULE TO PREVENT HARDCODING FILES
const path = require("path");

fs.readFile(path.join(__dirname, "readme.md"), "utf8", (err, data) => {
  if (err) throw err;
  //console.log(data.toString() /* hvis ikke tostring() så får man buffer*/);
});

fs.writeFile(
  path.join(__dirname, "files", "elever.txt"),
  "oskar\njulie\nvictor",
  (err) => {
    if (err) {
      throw err;
    }
    //console.log("wrote first students");
  }
);
// brug async fs.rename til at ændre fil navn

//////////-------      PROMISES    TO PREVENT CALLBACK HELL      ------------------
const fsPromsises = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromsises.readFile(
      path.join(__dirname, "files", "elever.txt"),
      "utf8"
    );
    console.log(data + "1");
  } catch (error) {
    console.log(err);
  }
};
fileOps();

// vær obs på at fsPromises ikke tager callback func men skal have .readFile eller anden method
async function promiseApRe(file, text) {
  const appender = await fsPromsises.appendFile(file, text, "utf8");
  const reader = await fsPromsises.readFile(file, "utf8");
  return reader;
}
async function main() {
  try {
    console.log(
      await promiseApRe(path.join(__dirname, "files", "elever"), "jens\n")
    );
  } catch (error) {
    console.log(error);
  }

  console.log(fsPromsises);
}
main();
