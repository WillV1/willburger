const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  //Check for token

  if(!token) {
    return res.status(401).json({msg: 'No token, authorization denied'});
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({msg: 'Token is not valid'})
  }
};