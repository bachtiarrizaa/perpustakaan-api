const jwt = require('jsonwebtoken');
const { BlacklistToken } = require('../models');

const verifyToken = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("You are not authorization");
  }

  const token = authHeader.split(" ")[1];

  const isBlacklisted = await BlacklistToken.findOne({ where: {token}} );
  if (isBlacklisted) {
    throw new Error("Token has been invalidated! Please login again");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

const mustLogin = async (req, res, next) => {
  try {
    const decoded = await verifyToken(req);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ status: "fail", message: error.message });
  }
};

const mustPetugas = async (req, res, next) => {
  try {
    const decoded = await verifyToken(req);

    if(decoded.role !== "petugas") {
      return res.status(403).json({
        status: 'fail',
        message: 'Access denied! Only petugas can access this resource.'
      });
    }

    req.user = decoded;
    next()
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ status: "fail", message: error.message });
  }
};

module.exports = { mustLogin, mustPetugas };