import { Reducer } from "redux";
import { StoreState } from "../state";
import { ActionType, SetAuthAction } from "../actions/types";

export const auth: Reducer<StoreState["auth"], SetAuthAction> = (
	state = null,
	action
) => {
	if (action.type === ActionType.SET_AUTH) {
		return action.payload;
	}

	return state;
};
