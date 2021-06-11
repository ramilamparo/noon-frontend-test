import Knex from "knex";
import { Model as ObjectionModel } from "objection";
import config from "knexfile";

const knex = Knex(config[process.env.NODE_ENV]);

export abstract class BaseModel extends ObjectionModel {
	public $beforeInsert() {
		this.createdAt = new Date();
	}

	public $beforeUpdate() {
		this.updatedAt = new Date();
	}

	public updatedAt: Date | null;

	public createdAt: Date;
}

BaseModel.knex(knex);
