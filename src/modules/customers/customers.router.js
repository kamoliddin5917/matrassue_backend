const router = require("express").Router();
const { pgFetch, pgFetchSingle } = require("../../lib/postgres");
const {
	GET_CUSTOMERS,
	POST_CUSTOMERS,
	UPDATE_CUSTOMERS,
	DELETE_CUSTOMERS,
} = require("./customers.model");

router
	.route("/")
	.get(async (_, res) => {
		try {
			const customers = await pgFetch(GET_CUSTOMERS);

			if (customers.length === 0) {
				return res.status(404).end();
			}

			res.json(customers);
		} catch (error) {
			res.status(500).end();
		}
	})
	.post(async (req, res) => {
		try {
			const { number } = req.body;
			if (!number) {
				return res.status(400).end();
			}

			const newCustomer = await pgFetchSingle(POST_CUSTOMERS, [number]);
			if (!newCustomer) {
				return res.status(500).end();
			}

			res.status(201).json({ message: "added" });
		} catch (error) {
			res.status(500).end();
		}
	})
	.put(async (req, res) => {
		try {
			const { id, contacted } = req.body;

			if (!id) {
				return res.status(400).end();
			}

			const contact = await pgFetchSingle(UPDATE_CUSTOMERS, [contacted, id]);
			if (!contact) {
				return res.status(404).end();
			}

			res.json({ message: "updated" });
		} catch (error) {
			res.status(500).end();
		}
	})
	.delete(async (req, res) => {
		try {
			const { id } = req.body;
			if (!id) {
				return res.status(400).end();
			}

			const deleted = await pgFetchSingle(DELETE_CUSTOMERS, [id]);
			if (!deleted) {
				return res.status(404).end();
			}

			res.json({ message: "deleted" });
		} catch (error) {
			res.status(500).end();
		}
	});

module.exports = router;
