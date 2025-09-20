var mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  code: Number,
});
let ShortUrl = mongoose.model("shortUrl", shortUrlSchema);

const createAndSaveUrl = (longUrl, done) => {
  ShortUrl.findOne({ url: longUrl })
    .then(function (u) {
      if (!u) {
        let hash = 0;
        for (const char of longUrl) {
          hash = (hash << 5) - hash + char.charCodeAt(0);
          hash |= 0; // Constrain to 32bit integer
        }

        let newShortUrl = new ShortUrl({
          url: longUrl,
          code: Math.abs(hash),
        });
        return newShortUrl.save().then((savedUrl) => {
          savedUrl === newShortUrl; // true
          done(null, newShortUrl);
        });
      } else {
        return done(null, u);
      }
    })
    .catch(function (err) {
      console.log("error in creation", err);
      done(err);
    });
};

const findUrl = (code, done) => {
  ShortUrl.findOne({ code: code })
    .then(function (data) {
      console.log(data);
      return done(null, data);
    })
    .catch(function (err) {
      console.log("error in finding url", err);
      return done(err);
    });
};

exports.ShortUrlModel = ShortUrl;
exports.createAndSaveUrl = createAndSaveUrl;
exports.findUrl = findUrl;
