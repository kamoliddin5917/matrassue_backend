const { verifyToken } = require("../lib/jwt");

const authCheck = (req, res, next) => {
	const token = req.headers.token;

	if (
		req.url === "/login" ||
		(req.url === "/technologies/all_active" && req.method === "GET") ||
		(req.url === "/products/all_active" && req.method === "GET") ||
		(req.url === "/categories" && req.method === "GET") ||
		(req.url === "/addresses" && req.method === "GET") ||
		(req.url === "/orders" && req.method === "POST") ||
		(req.url === "/customers" && req.method === "POST")
	) {
		next();
		return;
	}

	if (!token) {
		return res.status(403).end();
	}

	verifyToken(token, (err) => {
		if (err) {
			return res.status(401).end();
		}
	});

	next();
};

module.exports = authCheck;
