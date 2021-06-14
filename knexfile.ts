import env from "dotenv";
import { Config } from "knex";
env.config();

const configs: Record<string, Config> = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./dev.sqlite3",
		},
		useNullAsDefault: true,
	},
	production: {
		client: "postgresql",
		connection: {
			database: process.env.DATABASE_NAME,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			host: process.env.DATABASE_HOST,
			port: process.env.DATABASE_PORT
				? Number(process.env.DATABASE_PORT)
				: undefined,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};

export default configs;
