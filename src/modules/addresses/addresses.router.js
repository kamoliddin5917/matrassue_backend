const router = require("express").Router();
const { pgFetch, pgFetchSingle } = require("../../lib/postgres");
const {
	GET_ADDRESSES,
	NEW_ADDRESS,
	UPDATE_ADDRESS,
	DELETE_ADDRESS,
} = require("./addresses.model");

router
	.route("/")
	.get(async (_, res) => {
		try {
			const addresses = await pgFetch(GET_ADDRESSES);

			if (addresses.length === 0) {
				return res.status(404).end();
			}

			res.json(addresses);
		} catch (error) {
			res.status(500).end();
		}
	})
	.post(async (req, res) => {
		try {
			const {
				address_name,
				address_description,
				address_image,
				address_lat,
				address_long,
				address_is_active,
			} = req.body;

			const address = await pgFetchSingle(NEW_ADDRESS, [
				address_name,
				address_description,
				address_image,
				address_lat,
				address_long,
				address_is_active,
			]);

			res.status(201).json(address);
		} catch (error) {
			res.status(500).end();
		}
	})
	.put(async (req, res) => {
		try {
			const {
				address_id,
				address_name,
				address_description,
				address_image,
				address_lat,
				address_long,
				address_is_active,
			} = req.body;

			const address = await pgFetchSingle(UPDATE_ADDRESS, [
				address_id,
				address_name,
				address_description,
				address_image,
				address_lat,
				address_long,
				address_is_active,
			]);

			res.json(address);
		} catch (error) {
			res.status(500).end();
		}
	})
	.delete(async (req, res) => {
		try {
			const { address_id } = req.body;
			if (!address_id) {
				return res.status(400).end();
			}
			await pgFetchSingle(DELETE_ADDRESS, [address_id]);
			res.json({ message: "deleted" });
		} catch (error) {
			res.status(500).end();
		}
	});

module.exports = router;
