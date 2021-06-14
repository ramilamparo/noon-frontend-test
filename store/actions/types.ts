import { Dispatch } from "react";
import { Action as ReduxAction } from "redux";
import { AlertAttributes, StoreState } from "../state";

export enum ActionType {
	SET_POSTS = "SET_POSTS",
	SET_AUTH = "SET_AUTH",
	CREATE_ALERT = "CREATE_ALERT",
	DISMISS_ALERT = "DISMISS_ALERT",
}

/**
 * T is type of action. P is payload.
 */
export interface Action<T, P> extends ReduxAction<T> {
	payload: P;
}

export type SetPostsAction = Action<ActionType.SET_POSTS, StoreState["posts"]>;

export type SetAuthAction = Action<ActionType.SET_AUTH, StoreState["auth"]>;

export type CreateAlertAction = Action<
	ActionType.CREATE_ALERT,
	AlertAttributes
>;

export type DismissAlertAction = Action<ActionType.DISMISS_ALERT, string>;

export type AllActions =
	| SetPostsAction
	| SetAuthAction
	| CreateAlertAction
	| DismissAlertAction;

export type AppDispatch = Dispatch<AllActions>;
