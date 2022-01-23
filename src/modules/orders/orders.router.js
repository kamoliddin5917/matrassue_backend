const router = require("express").Router();
const { pgFetch, pgFetchSingle } = require("../../lib/postgres");
const { GET_ORDERS, POST_ORDERS, UPDATE_ORDERS } = require("./orders.model");

router
	.route("/")
	.get(async (_, res) => {
		try {
			const orders = await pgFetch(GET_ORDERS);

			if (orders.length === 0) {
				return res.status(404).end();
			}

			res.json(orders);
		} catch (error) {
			res.status(500).end();
		}
	})
	.post(async (req, res) => {
		try {
			const { productID, amount, customerName, customerPhone } = req.body;

			if (customerName === "" || customerPhone === "" || amount < 1) {
				return res.status(400).end();
			}

			await pgFetchSingle(POST_ORDERS, [productID, amount, customerName, customerPhone]);

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

			const contact = await pgFetchSingle(UPDATE_ORDERS, [id, contacted]);
			if (!contact) {
				return res.status(404).end();
			}

			res.json({ message: "updated" });
		} catch (error) {
			res.status(500).end();
		}
	});

module.exports = router;
