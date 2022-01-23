const GET_TECHNOLOGIES_ALL = `
SELECT *
FROM technologies
ORDER BY technology_added_date DESC
`;

const GET_TECHNOLOGIES_ALL_ACTIVE = `
SELECT *
FROM technologies
WHERE technology_is_active IS TRUE
ORDER BY technology_added_date DESC
`;

const NEW_TECHNOLOGY = `
INSERT INTO technologies
(technology_name,
 technology_description,
 technology_thumbnail,
 technology_video,
 technology_is_active)
VALUES ($1, $2, $3, $4, $5)
RETURNING *
`;

const UPDATE_TECHNOLOGY = `
UPDATE technologies
SET technology_name        = COALESCE($2, technology_name),
	technology_description = COALESCE($3, technology_description),
	technology_thumbnail   = COALESCE($4, technology_thumbnail),
	technology_video       = COALESCE($5, technology_video),
	technology_is_active   = COALESCE($6, technology_is_active)
WHERE technology_id = $1
RETURNING *
`;

const DELETE_TECHNOLOGY = `
DELETE
FROM technologies
WHERE technology_id = $1
RETURNING *
`;

module.exports = {
	GET_TECHNOLOGIES_ALL,
	GET_TECHNOLOGIES_ALL_ACTIVE,
	NEW_TECHNOLOGY,
	UPDATE_TECHNOLOGY,
	DELETE_TECHNOLOGY,
};
