import { v4 as uuidv4 } from "uuid";
import { AlertType } from "../state";
import { ActionType, DismissAlertAction, CreateAlertAction } from "./types";

export interface CreateAlertInput {
	message: string;
	type?: AlertType;
	expiry?: number;
}

export abstract class Alert {
	public static dismiss = (id: string): DismissAlertAction => {
		return { type: ActionType.DISMISS_ALERT, payload: id };
	};

	public static create = (input: CreateAlertInput): CreateAlertAction => {
		const id = uuidv4();

		return {
			type: ActionType.CREATE_ALERT,
			payload: {
				id,
				message: input.message,
				type: input.type || "INFO",
				expiry: input.expiry,
			},
		};
	};
}
