const redisClient = require('./signin').redisClient;

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json('Unauthorized');
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json('Unauthorized');
    }
    console.log('you shall pass!');
    return next(); // go to the next part of the request
  });
};

module.exports = {
  requireAuth,
};
