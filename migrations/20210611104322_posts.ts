import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("Posts", (table) => {
		table.string("title", 128).notNullable();
		table.string("description", 1024).notNullable();
		table.string("imageSrc", 256).notNullable();
		table.integer("authorId").unsigned().references("Users.id").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable("Accounts", (table) => {
		table.dropColumns("title", "description", "imageSrc", "authorId");
	});
}
