import * as Knex from "knex";

const tables: string[] = ["Users", "Posts", "UserFavoriteMap"];

export async function up(knex: Knex): Promise<void> {
	const createTable = (table: Knex.CreateTableBuilder) => {
		table.increments("id");
		table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
		table.timestamp("updatedAt").nullable();
	};
	await Promise.all(
		tables.map((tableName) => {
			return knex.schema.createTable(tableName, createTable);
		})
	);
}

export async function down(knex: Knex): Promise<void> {
	await Promise.all(
		tables.map((tableName) => {
			return knex.schema.dropTableIfExists(tableName);
		})
	);
}
