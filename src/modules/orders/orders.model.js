const GET_ORDERS = `
SELECT order_id,
	   order_amount,
	   order_customer_name,
	   order_customer_phone,
	   order_is_fulfilled,
	   product_name
FROM orders
INNER JOIN products ON orders.order_product_id = products.product_id
ORDER BY order_date DESC
`;

const POST_ORDERS = `
INSERT INTO orders
(order_product_id,
 order_amount,
 order_customer_name,
 order_customer_phone)
VALUES ($1, $2, $3, $4)
RETURNING *
`;

const UPDATE_ORDERS = `
UPDATE orders
SET order_is_fulfilled = $2
WHERE order_id = $1
RETURNING *
`;

module.exports = {
	GET_ORDERS,
	POST_ORDERS,
	UPDATE_ORDERS
};
