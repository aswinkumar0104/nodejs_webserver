const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|index(.html)?", (req, res) => {
  //res.send("This is route file");
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "new-page.html");
});

router.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
});

router.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("try entering to unknown page");
    //res.send("Into the hello page function");
    next();
  },
  (req, res) => {
    res.send("Into the next function");
  }
);

const one = (req, res, next) => {
  console.log("into the one function");
  next();
};
const two = (req, res, next) => {
  console.log("into the two function");
  next();
};
const three = (req, res, next) => {
  console.log("into the three function");
  res.send("end of the chain function");
};

router.get("/chain(.html)?", [one, two, three]);

module.exports = router;
