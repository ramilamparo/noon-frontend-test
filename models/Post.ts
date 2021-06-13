import { BaseModel } from "./BaseModel";
import { RelationMappings } from "objection";
import { User } from "./User";

export interface PostCreateAttributes {
	title: string;
	description: string;
	authorId: number;
}

export interface PostAttributes {
	id: number;
	title: string;
	description: string;
	authorId: number;
}

export class Post extends BaseModel implements PostAttributes {
	public static get tableName() {
		return "Posts";
	}

	public static get relationMappings(): RelationMappings {
		return {
			author: {
				relation: BaseModel.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: `${Post.tableName}.authorId`,
					to: `${User.tableName}.id`,
				},
			},
			favorites: {
				relation: BaseModel.ManyToManyRelation,
				modelClass: User,
				join: {
					from: `${Post.tableName}.id`,
					to: `${User.tableName}.id`,
					through: {
						from: "UserFavoriteMap.postId",
						to: "UserFavoriteMap.userId",
					},
				},
			},
		};
	}

	public id: number;

	public title: string;

	public description: string;

	public authorId: number;

	public imageSrc: string;
}
