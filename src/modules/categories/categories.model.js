const GET_CATEGORIES = `
SELECT *
FROM categories
ORDER BY category_date DESC
`;

const NEW_CATEGORY = `
INSERT INTO categories (category_name, category_is_active)
VALUES ($1, $2)
RETURNING *
`;

const UPDATE_CATEGORY = `
UPDATE categories
SET category_is_active = $2
WHERE category_id = $1
RETURNING *
`;

const DELETE_CATEGORY = `
DELETE
FROM categories
WHERE category_id = $1
RETURNING *
`;

module.exports = { GET_CATEGORIES, NEW_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY };
