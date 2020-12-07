const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token found, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // the req user is modified so now has info that allows to have access
    // this is just a step  so the following code can read ne modified req.user and allow access.
    // This is why its called middleware. Its yous like a guard.
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' })
  }
}