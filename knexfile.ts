import { Config } from "knex";

const configs: Record<string, Config> = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./dev.sqlite3",
		},
		useNullAsDefault: true,
	},
	production: {
		client: "sqlite3",
		connection: {
			filename: "./prod.sqlite3",
		},
		useNullAsDefault: true,
	},
};

export default configs;
