const GET_ADDRESSES = `
SELECT *
FROM addresses
ORDER BY address_added_date DESC
`;

const NEW_ADDRESS = `
INSERT INTO addresses
(address_name, address_description,
 address_image, address_lat,
 address_long, address_is_active)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *
`;

const UPDATE_ADDRESS = `
UPDATE addresses
SET address_name        = COALESCE($2, address_name),
	address_description = COALESCE($3, address_description),
	address_image       = COALESCE($4, address_image),
	address_lat         = COALESCE($5, address_lat),
	address_long        = COALESCE($6, address_long),
	address_is_active   = COALESCE($7, address_is_active)
WHERE address_id = $1
RETURNING *
`;

const DELETE_ADDRESS = `
DELETE
FROM addresses
WHERE address_id = $1
`;

module.exports = {
	GET_ADDRESSES,
	NEW_ADDRESS,
	UPDATE_ADDRESS,
	DELETE_ADDRESS,
};
