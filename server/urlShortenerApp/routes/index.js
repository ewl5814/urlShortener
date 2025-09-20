var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const createShortUrl = require("../db.js").createAndSaveUrl;
router.post("/", function (req, res, next) {
  createShortUrl(req.body.url, function (err, data) {
    if (err) console.error(err);
    else if (!data) console.error("no data", err);
    else {
      res.json({ longUrl: data.url, shortUrl: data.code });
    }
  });
});

const findUrl = require("../db.js").findUrl;
router.get("/shorturl/:code", function (req, res, next) {
  findUrl(req.params.code, function (err, data) {
    if (err) console.error(err);
    else if (!data) console.error("no data", err);
    else {
      console.log(data.url);
      res.redirect(data.url);
    }
  });
});

module.exports = router;
