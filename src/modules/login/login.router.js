const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { pgFetchSingle } = require("../../lib/postgres");
const { genToken } = require("../../lib/jwt");
const { GET_ADMIN } = require("./login.model");

router.route("/").post(async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!username || !password) {
		return res.status(400).end();
	}

	try {
		const admin = await pgFetchSingle(GET_ADMIN, [username]);
		if (!admin) {
			return res.status(404).end();
		}

		bcrypt.compare(password, admin.password, (err, success) => {
			if (err) {
				return res.status(500).end();
			}
			if (!success) {
				return res.status(401).end();
			}

			const token = genToken({
				id: admin.id,
				username: admin.username,
				is_root: admin.is_root,
			});

			res.json({ token });
		});
	} catch (error) {
		res.status(500).end();
	}
});

module.exports = router;
