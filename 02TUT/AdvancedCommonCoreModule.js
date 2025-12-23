// importer nødvendige npm moduels -> skal bruge npm install
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// importere common core modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFile) => {
  //klar gøre message
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")};`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n\n`;

  console.log(logItem);

  try {
    // laver logs mappe hvis ikke findes allerede
    const logsDir = path.join(__dirname, "logs");
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    // appender message
    await fsPromises.appendFile(
      path.join(__dirname, "/logs", logFile),
      logItem
    );
  } catch (err) {
    throw err;
  }
};
//exportere logevents
module.exports = logEvents;
