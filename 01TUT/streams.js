////////////////////////////////////////            DATA STREAMS                   ////////////////////////////
/*fs(filesystem) har adgang til streams er måde hvor man kan læse/skrive små stykker af store filer lidt af af gangen sådan at det ikke tager uendeligtid 
og brugesogså f.eks. til videoer*/

const fs = require("fs");
const path = require("path");

// fortæller hvilken fil skal læses fra og hvilken encoding
const rs = fs.createReadStream(path.join(__dirname, "files", "newFile.txt"), {
  encoding: "utf8",
});
// fortæller hvilken fil skal skrives til, her er encoding utf8 default
const ws = fs.createWriteStream(path.join(__dirname, "files", "2new-File.txt"));

// .on er en form for ecentlistener der tager en callback function
rs.on("data", (datachunk) => {
  ws.write(datachunk);
});

// der findes også andre events end 'data', f.eks. 'end'
rs.on("end", () => {
  ws.end();
});

// .pipe er en shortcut for ovenstående
rs.pipe(ws);

// use fs.existsSync for tjekke om fil findes
if (!fs.existsSync("./new")) {
  // to make directory¨
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("directory created");
  });
}

if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("folder removed");
  });
}
