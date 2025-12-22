// npm = node package manager --> npmjs.com

// primære brug = npw cli = commandline interface

console.log("package");
// for at initialisere en package brug
// npm init -y
//        y = yes to all the default questiens

console.log("nodemon");
// ---> til terminal 'npm i nodemon -g'
//            i = install        g = globally
console.log("dev Dependencies");
// brug "npm i nodemon -D" obs -D

// package.json fil bruges til at vide hvilke dependencies som skal tilføjes --> på den måde kan man lave en .gitignore fil
// .gitignore skal indholde de filer/folders som ikek skal oploades til git f.eks. node_modules
// ved cloning af git brug "npm install" i terminal som vil læse package.json og installere nævnte

// fx "npm i data-fns"
const { format } = require("date-fns");
console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

// -------------------------                SCRIPTS           --------------------------------
console.log("scripts");
//  package.json indholder en scripts object property hvortil vi kan tilføje
console.log("grundide");
/* {        gurnd ide = man kan oprette genveje til kommandoer  -->
  "scripts": {
    "navn": "kommando"
  }
}*/
console.log("eksempel scripts");
/*{
  "scripts": {
    "start": "node streams.js",
    "dev": "nodemon streams.js"
  }
}
*/

// ----------        LEARN NEW PACKAGES
//use npm aller øverste search bar

// import version 4 as new name fx uuid:
const { v4: uuid } = require("uuid");
// uuid kan generate different ids --> very useful to maybe send with each writing eller log fx.
console.log(uuid());

// ---------------------------   version kontrol of packages
console.log("version control");
/*
| Tegn    | Eksempel   | Hvad betyder det?          | Hvornår bruges det?           |
| ------- | ---------- | -------------------------- | ----------------------------- |
| `^`     | `^3.1.11`  | Tillader **minor + patch** | Standardvalg (mest brugt)     |
| `~`     | `~3.1.11`  | Kun **patch**              | Når du vil være ekstra sikker |
| (intet) | `3.1.11`   | **Præcis version**         | Når intet må ændre sig        |
| `*`     | `*`        | **Alt tilladt**            | Næsten aldrig (farligt)       |
| `>=`    | `>=3.1.11` | Mindst denne version       | Sjældent                      |
| `<`     | `<4.0.0`   | Mindre end                 | Avanceret styring             |
*/
