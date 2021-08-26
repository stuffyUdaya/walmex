"use strict";
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();
app.use(favicon(path.join(__dirname, "../public", "favicon.png")));

const registerRoutes = require("./routes");

// server config
const port = process.env.PORT || 3000;

//error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
});
// register routes
registerRoutes(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
// create server start method
const start = () => {
  return new Promise((resolve, reject) => {
    // start the server
    app.listen(port, () => {
      console.log(`Connected to Port ${port}`);
      resolve();
    });
  }).catch((error) => {
    console.log(`failed to start server => ${error.message}`);
  });
};

module.exports = start;
