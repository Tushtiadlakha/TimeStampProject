// index.js
// where your node app starts
require("dotenv").config();
// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:userDate?", function (req, res) {
  try {
    let userDate = req.params.userDate;

    if (!userDate) {
      userDate = new Date().toISOString();
    }
    let date;
    if (!isNaN(userDate) && userDate.length === 13) {
      date = new Date(parseInt(userDate));
    } else {
      date = new Date(userDate);
    }

    if (date.toString() === "Invalid Date") {
      throw new Error("Invalid Date");
    }

    let unix = Math.floor(date.getTime());
    let utc = date.toUTCString();

    res.json({ unix, utc });
  } catch (err) {
    res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
