import { BaseModel } from "./BaseModel";
import { RelationMappings } from "objection";
import { Post } from "./Post";

export interface AccountCreateAttributes {
	username: string;
	password: string;
}

export interface AccountAttributes {
	id: number;
	username: string;
	password: string;
}

export class User extends BaseModel implements AccountAttributes {
	public static get tableName() {
		return "Users";
	}

	public static get relationMappings(): RelationMappings {
		return {
			posts: {
				relation: BaseModel.HasManyRelation,
				modelClass: Post,
				join: {
					from: `${User.tableName}.id`,
					to: `${Post.tableName}.authorId`,
				},
			},
			favorites: {
				relation: BaseModel.ManyToManyRelation,
				modelClass: Post,
				join: {
					from: `${User.tableName}.id`,
					to: `${Post.tableName}.id`,
					through: {
						from: "UserFavoriteMap.userId",
						to: "UserFavoriteMap.postId",
					},
				},
			},
		};
	}

	public id: number;

	public username: string;

	public password: string;
}
