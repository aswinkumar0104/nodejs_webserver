const logger = require("./logEvents");

const error_handler = (err, req, res, next) => {
  logger.logEvents(`${err.name} \t ${err.message}`, "cors.txt");
  console.log(err);
  res.status(500).send(err.message);
  next();
};

module.exports = { error_handler };
