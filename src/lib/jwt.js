const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const genToken = (data) => jwt.sign(data, SECRET_KEY);

const verifyToken = (token, callback) => {
	jwt.verify(token, SECRET_KEY, callback);
};

const decodeToken = (token) => jwt.decode(token);

module.exports = { genToken, verifyToken, decodeToken };
