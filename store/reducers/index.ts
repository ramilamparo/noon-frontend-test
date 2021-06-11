import { combineReducers } from "redux";
import { posts } from "./posts";
import { StoreState } from "../state";

export const reducers = combineReducers<StoreState>({
	posts,
});
