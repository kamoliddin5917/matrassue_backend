const router = require("express").Router();
const { pgFetch, pgFetchSingle } = require("../../lib/postgres");
const {
	GET_TECHNOLOGIES_ALL,
	GET_TECHNOLOGIES_ALL_ACTIVE,
	NEW_TECHNOLOGY,
	UPDATE_TECHNOLOGY,
	DELETE_TECHNOLOGY,
} = require("./technologies.model");

router.route("/:tech").get(async (req, res) => {
	try {
		const { tech } = req.params;
		let technologies;

		switch (tech) {
		case "all":
			technologies = await pgFetch(GET_TECHNOLOGIES_ALL);
			break;
		case "all_active":
			technologies = await pgFetch(GET_TECHNOLOGIES_ALL_ACTIVE);
			break;
		default:
			return res.status(400).end();
		}

		if (technologies.length === 0) {
			return res.status(404).end();
		}

		res.json(technologies);
	} catch (error) {
		res.status(500).end();
	}
});

router
	.route("/")
	.post(async (req, res) => {
		try {
			const { name, description, img, video, is_active } = req.body;

			if (!name || !description || !img || !video || typeof is_active !== "boolean") {
				return res.status(400).end();
			}

			const newTechnology = await pgFetchSingle(NEW_TECHNOLOGY, [
				name,
				description,
				img,
				video,
				is_active,
			]);

			if (!newTechnology) {
				return res.status(500).end();
			}

			res.json({ message: "new technology added", technology: newTechnology });
		} catch (error) {
			res.status(500).end();
		}
	})
	.put(async (req, res) => {
		try {
			const { technology_id, name, description, img, video, is_active } = req.body;

			if (!technology_id) {
				return res.status(400).end();
			}

			const updatedTechnology = await pgFetchSingle(UPDATE_TECHNOLOGY, [
				technology_id,
				name,
				description,
				img,
				video,
				is_active,
			]);

			if (!updatedTechnology) {
				return res.status(500).end();
			}

			res.json({ message: "technology updated", technology: updatedTechnology });
		} catch (error) {
			res.status(500).end();
		}
	})
	.delete(async (req, res) => {
		try {
			const { technology_id } = req.body;
			if (!technology_id) {
				return res.status(400).end();
			}

			const deletedTechnology = await pgFetchSingle(DELETE_TECHNOLOGY, [technology_id]);
			if (!deletedTechnology) {
				return res.status(500).end();
			}

			res.json({ message: "technology deleted", technology: deletedTechnology });
		} catch (error) {
			res.status(500).end();
		}
	});

module.exports = router;
