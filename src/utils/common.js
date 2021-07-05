const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const CustomError = require('./error');

const ignoreRoutes = [
  'POST:/login',
];

const createHash = (str) => {
    return crypto.createHash('sha256').update(str).digest('hex');
};

const createToken = (data) => {
    return jwt.sign({
        data
    }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRY
    });
};

const checkToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let isAllow = false;
    const path = req.path;
    const splitPath = path.split('/');
    if (splitPath.length > 1 && ignoreRoutes.includes(`${req.method}:/${splitPath[1]}`)) {
      isAllow = true;
    } else if (ignoreRoutes.includes(`${req.method}:${req.path}`)) {
      isAllow = true;
    }
    if (isAllow) return next();
    if (!authorization) return res.sendStatus(401);
    const authorizationHeader = authorization.split(' ');
    if (authorizationHeader < 2) {
      return res.sendStatus(401);
    }
    const token = authorizationHeader[1];
    // await verifyToken(req, res, token);
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.data;
    return next();
  } catch (err) {
      console.log(err);
    return next(new CustomError(401, err.message));
  }
};

module.exports =  {
    createHash,
    createToken,
    checkToken
};
