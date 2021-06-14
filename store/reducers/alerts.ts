import { Reducer } from "redux";
import {
	ActionType,
	CreateAlertAction,
	DismissAlertAction,
} from "../actions/types";
import { StoreState } from "../state";

export const alerts: Reducer<
	StoreState["alerts"],
	CreateAlertAction | DismissAlertAction
> = (state = [], action) => {
	if (action.type === ActionType.CREATE_ALERT) {
		const newState = [...state];
		newState.push(action.payload);
		return newState;
	} else if (action.type === ActionType.DISMISS_ALERT) {
		const newState = [...state];
		const index = newState.findIndex((alert) => alert.id === action.payload);
		if (index >= 0) {
			newState.splice(index, 1);
		}
		return newState;
	}
	return state;
};
