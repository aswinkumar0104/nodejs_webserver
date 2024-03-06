const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join("logs"))) {
      await fsPromises.mkdir(path.join("logs"));
    }

    await fsPromises.appendFile(path.join("logs", logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

const logdata = (req, res, next) => {
  logEvents(
    `${req.method} \t ${req.headers.origin} \t ${req.path}`,
    "request.txt"
  );
  next();
};

module.exports = { logEvents, logdata };
