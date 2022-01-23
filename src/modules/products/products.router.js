const router = require("express").Router();
const { pgFetch, pgFetchSingle } = require("../../lib/postgres");
const {
	GET_PRODUCTS_ALL,
	GET_PRODUCTS_ALL_ACTIVE,
	GET_PRODUCTS_BY_CATEGORY_ACTIVE,
	ADD_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
} = require("./products.model");

router.route("/:category").get(async (req, res) => {
	const { category } = req.params;
	if (!category) {
		return res.status(400).end();
	}

	try {
		let products;

		switch (category) {
		case "all":
			products = await pgFetch(GET_PRODUCTS_ALL);
			break;
		case "all_active":
			products = await pgFetch(GET_PRODUCTS_ALL_ACTIVE);
			break;
		default:
			products = await pgFetch(GET_PRODUCTS_BY_CATEGORY_ACTIVE, [category]);
		}

		if (products.length === 0) {
			return res.status(404).end();
		}

		res.json(products);
	} catch (error) {
		res.status(500).end();
	}
});

router
	.route("/")
	.post(async (req, res) => {
		try {
			const {
				category_id,
				name,
				price,
				description,
				images,
				cargo,
				dimensions,
				warranty,
				capacity,
				sale_price,
				is_new,
				is_active,
				is_on_sale,
			} = req.body;

			if (
				!category_id ||
				!name ||
				!price ||
				!description ||
				!cargo ||
				!dimensions ||
				!capacity ||
				typeof is_new !== "boolean" ||
				typeof is_active !== "boolean" ||
				typeof is_on_sale !== "boolean"
			) {
				return res.status(400).end();
			}

			if (!Array.isArray(images) || images.length === 0 || images.length > 4) {
				return res.status(400).end();
			}

			const product = await pgFetchSingle(ADD_PRODUCT, [
				category_id,
				name,
				price,
				description,
				images,
				cargo,
				dimensions,
				warranty,
				capacity,
				sale_price,
				is_new,
				is_active,
				is_on_sale,
			]);

			res.json({ message: "added", product });
		} catch (error) {
			res.status(500).end();
		}
	})
	.put(async (req, res) => {
		const id = req.body.id;
		if (!id) {
			return res.status(400).end();
		}

		const {
			category_id,
			name,
			price,
			description,
			images,
			cargo,
			dimensions,
			warranty,
			capacity,
			sale_price,
			is_new,
			is_active,
			is_on_sale,
		} = req.body;

		try {
			const updatedProduct = await pgFetchSingle(UPDATE_PRODUCT, [
				id,
				category_id,
				name,
				price,
				description,
				images,
				cargo,
				dimensions,
				warranty,
				capacity,
				sale_price,
				is_new,
				is_active,
				is_on_sale,
			]);

			res.json({ message: "updated", product: updatedProduct });
		} catch (error) {
			res.status(500).end();
		}
	})
	.delete(async (req, res) => {
		const id = req.body.id;
		if (!id) {
			return res.status(400).end();
		}

		try {
			await pgFetchSingle(DELETE_PRODUCT, [id]);
			res.json({ message: "deleted" });
		} catch (error) {
			res.status(500).end();
		}
	});

module.exports = router;
