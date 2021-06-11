import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("UserFavoriteMap", (table) => {
		table.integer("userId").unsigned().references("Users.id").notNullable();
		table.integer("postId").unsigned().references("Posts.id").notNullable();
		table.unique(["userId", "postId"]);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable("Accounts", (table) => {
		table.dropColumns("userId", "postId");
	});
}
