import { Config } from "knex";

const configs: Record<string, Config> = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./dev.sqlite3",
		},
	},
	production: {
		client: "sqlite3",
		connection: {
			filename: "./dev.sqlite3",
		},
	},
};

export default configs;
