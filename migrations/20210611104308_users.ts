import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("Users", (table) => {
		table.string("username", 320).notNullable().unique();
		table.string("password", 128).notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable("Users", (table) => {
		table.dropColumns("username", "password");
	});
}
