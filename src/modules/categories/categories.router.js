const router = require("express").Router();
const { pgFetch, pgFetchSingle } = require("../../lib/postgres");
const {
	GET_CATEGORIES,
	NEW_CATEGORY,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
} = require("./categories.model");

router
	.route("/")
	.get(async (_, res) => {
		try {
			const categories = await pgFetch(GET_CATEGORIES);

			if (categories.length === 0) {
				return res.status(404).end();
			}

			res.json(categories);
		} catch (error) {
			res.status(500).end();
		}
	})
	.post(async (req, res) => {
		try {
			const { name, is_active } = req.body;
			if (!name || typeof is_active !== "boolean") {
				return res.status(400).end();
			}

			const newCategory = await pgFetchSingle(NEW_CATEGORY, [name, is_active]);
			if (!newCategory) {
				return res.status(500).end();
			}

			res.json({ message: "added new category", category: newCategory });
		} catch (error) {
			res.status(500).end();
		}
	})
	.put(async (req, res) => {
		try {
			const { category_id, is_active } = req.body;

			if (!category_id || typeof is_active !== "boolean") {
				return res.status(400).end();
			}

			const updateCategory = await pgFetchSingle(UPDATE_CATEGORY, [category_id, is_active]);
			if (!updateCategory) {
				return res.status(500).end();
			}

			res.json({ message: "category updated", category: updateCategory });
		} catch (error) {
			res.status(500).end();
		}
	})
	.delete(async (req, res) => {
		try {
			const { category_id } = req.body;
			if (!category_id) {
				return res.status(400).end();
			}

			const deletedCategory = await pgFetchSingle(DELETE_CATEGORY, [category_id]);
			if (!deletedCategory) {
				return res.status(500).end();
			}

			res.json({ message: "category deleted", category: deletedCategory });
		} catch (error) {
			res.status(500).end();
		}
	});

module.exports = router;
