const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DB_CONN_STR });

const pgFetch = async (query, params) => {
	let client = await pool.connect();
	let data = await client.query(query, params);
	client.release();
	return data.rows;
};

const pgFetchSingle = async (query, params) => {
	let [row] = await pgFetch(query, params);
	return row;
};

module.exports = { pgFetch, pgFetchSingle };
