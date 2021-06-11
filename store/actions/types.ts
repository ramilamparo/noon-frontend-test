import { Dispatch } from "react";
import { Action as ReduxAction } from "redux";
import { StoreState } from "../state";

export enum ActionType {
	SET_POSTS = "SET_POSTS",
}

/**
 * T is type of action. P is payload.
 */
export interface Action<T, P> extends ReduxAction<T> {
	payload: P;
}

export type SetPostsAction = Action<ActionType.SET_POSTS, StoreState["posts"]>;

export type AllActions = SetPostsAction;

export type AppDispatch = Dispatch<AllActions>;
