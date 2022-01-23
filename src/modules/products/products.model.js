const GET_PRODUCTS_ALL = `
SELECT category_name,
	   product_id          AS id,
	   product_name        AS name,
	   product_price       AS price,
	   product_description AS description,
	   product_images      AS images,
	   product_cargo       AS cargo,
	   product_dimensions  AS dimensions,
	   product_warranty    AS warranty,
	   product_capacity    AS capacity,
	   product_sale_price  AS sale_price,
	   product_is_new      AS is_new,
	   product_is_active   AS is_active,
	   product_is_on_sale  AS is_on_sale
FROM products
LEFT JOIN categories c ON products.product_category_id = c.category_id
ORDER BY product_added_date DESC
`;

const GET_PRODUCTS_ALL_ACTIVE = `
SELECT product_id          AS id,
	   product_category_id AS category_id,
	   product_name        AS name,
	   product_price       AS price,
	   product_description AS description,
	   product_images      AS images,
	   product_cargo       AS cargo,
	   product_dimensions  AS dimensions,
	   product_warranty    AS warranty,
	   product_capacity    AS capacity,
	   product_sale_price  AS sale_price,
	   product_is_new      AS is_new,
	   product_is_on_sale  AS is_on_sale
FROM products
WHERE product_is_active IS TRUE;
`;

const GET_PRODUCTS_BY_CATEGORY_ACTIVE = `
SELECT p.product_id          AS id,
	   p.product_name        AS name,
	   p.product_price       AS price,
	   p.product_description AS description,
	   p.product_images      AS images,
	   p.product_cargo       AS cargo,
	   p.product_dimensions  AS dimensions,
	   p.product_warranty    AS warranty,
	   p.product_capacity    AS capacity,
	   p.product_sale_price  AS sale_price,
	   p.product_is_new      AS is_new,
	   p.product_is_on_sale  AS is_on_sale
FROM products p
LEFT JOIN categories c ON p.product_category_id = c.category_id
WHERE p.product_is_active IS TRUE
  AND p.product_category_id = $1
`;

const ADD_PRODUCT = `
INSERT INTO products
(product_category_id,
 product_name,
 product_price,
 product_description,
 product_images,
 product_cargo,
 product_dimensions,
 product_warranty,
 product_capacity,
 product_sale_price,
 product_is_new,
 product_is_active,
 product_is_on_sale)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
RETURNING product_id
`;

const UPDATE_PRODUCT = `
UPDATE products
SET product_category_id = COALESCE($2, product_category_id),
	product_name        = COALESCE($3, product_name),
	product_price       = COALESCE($4, product_price),
	product_description = COALESCE($5, product_description),
	product_images      = COALESCE($6, product_images),
	product_cargo       = COALESCE($7, product_cargo),
	product_dimensions  = COALESCE($8, product_dimensions),
	product_warranty    = COALESCE($9, product_warranty),
	product_capacity    = COALESCE($10, product_capacity),
	product_sale_price  = COALESCE($11, product_sale_price),
	product_is_new      = COALESCE($12, product_is_new),
	product_is_active   = COALESCE($13, product_is_active),
	product_is_on_sale  = COALESCE($14, product_is_on_sale)
WHERE product_id = $1
RETURNING
	product_id          AS id,
	product_category_id AS category_id,
	product_name        AS name,
	product_price       AS price,
	product_description AS description,
	product_images      AS images,
	product_cargo       AS cargo,
	product_dimensions  AS dimensions,
	product_warranty    AS warranty,
	product_capacity    AS capacity,
	product_sale_price  AS sale_price,
	product_is_new      AS is_new,
	product_is_active   AS is_active,
	product_is_on_sale  AS is_on_sale
`;

const DELETE_PRODUCT = `
DELETE
FROM products
WHERE product_id = $1
`;

module.exports = {
	GET_PRODUCTS_ALL,
	GET_PRODUCTS_ALL_ACTIVE,
	GET_PRODUCTS_BY_CATEGORY_ACTIVE,
	ADD_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
};
