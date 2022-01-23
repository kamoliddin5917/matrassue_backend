const GET_ADMIN = `
SELECT admin_id       AS id,
	   admin_username AS username,
	   admin_password AS password,
	   admin_is_root  AS is_root
FROM admins
WHERE admin_username = $1
`;

module.exports = { GET_ADMIN };
