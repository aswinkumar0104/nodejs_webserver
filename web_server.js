const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const SubRouter = require("./routes/subdir.js");
const MainRouter = require("./routes/mainroutes.js");
const ApiRouter = require("./routes/API/apiroutes.js");
const logger = require("./middleware/logEvents.js");
const ErrorHandler = require("./middleware/errorHandling.js");
const PORT = 7000;

app.use(logger.logdata);

const whitelist = ["https://www.bang.com", "http://localhost:7000"];
const processWhileList = {
  origin: (origin_site, callback) => {
    if (whitelist.indexOf(origin_site) !== -1 || !origin_site) {
      callback(null, true);
    } else {
      callback(new Error("Illegal entry"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(processWhileList));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use("/subdir", express.static(path.join(__dirname, "./public")));

// app.get("/", (req, res) => {
//   //res.send("This is route file");
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });
app.use("/subdir", SubRouter);
app.use("/api", ApiRouter);
app.use("/", MainRouter);

app.use(ErrorHandler.error_handler);
app.listen(PORT, () => console.log(PORT));
