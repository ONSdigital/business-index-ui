const mcache = require('memory-cache');

/*
 * Call cache(duration) to cache a response for a certain
 * duration, or an unlimited duration if no duration is passed in.
*/
const cache = (duration) => {
  return (req, res, next) => {
    const url = (req.originalUrl || req.url);
    const key = `__express__${url}`;
    const cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    }
    res.sendResponse = res.send;
    res.send = (body) => {
      if (duration === undefined) {
        mcache.put(key, body);
      } else {
        mcache.put(key, body, duration);
      }
      res.sendResponse(body);
    };
    next();
  };
};

module.exports = cache;
