const GET_CUSTOMERS = `
SELECT *
FROM quotes
ORDER BY quote_date DESC
`;

const POST_CUSTOMERS = `
INSERT INTO quotes(quote_number)
VALUES ($1)
RETURNING *
`;

const UPDATE_CUSTOMERS = `
UPDATE quotes
SET quote_contacted = $1
WHERE quote_id = $2
RETURNING *
`;

const DELETE_CUSTOMERS = `
DELETE
FROM quotes
WHERE quote_id = $1
RETURNING *
`;

module.exports = {
	GET_CUSTOMERS,
	POST_CUSTOMERS,
	UPDATE_CUSTOMERS,
	DELETE_CUSTOMERS,
};
