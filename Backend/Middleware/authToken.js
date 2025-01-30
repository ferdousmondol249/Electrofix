const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      return next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return next(); 
    }
  } else {
    return next();
  }
};

module.exports = authToken;
