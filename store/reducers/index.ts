import { combineReducers } from "redux";
import { posts } from "./posts";
import { auth } from "./auth";
import { StoreState } from "../state";

export const reducers = combineReducers<StoreState>({
	posts,
	auth,
});
