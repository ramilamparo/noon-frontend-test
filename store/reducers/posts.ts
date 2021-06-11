import { Reducer } from "redux";
import { StoreState } from "../state";
import { SetPostsAction, ActionType } from "../actions/types";

export const posts: Reducer<StoreState["posts"], SetPostsAction> = (
	state = null,
	action
) => {
	if (action.type === ActionType.SET_POSTS) {
		return action.payload;
	}

	return state;
};
