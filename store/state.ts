import { createStore, Store } from "redux";
import { PostResponseData } from "@typings";
import { reducers } from "./reducers";
import { AllActions } from "./actions/types";
import { useMemo } from "react";

let store: Store<StoreState, AllActions> | undefined;

export type PostsState = PostResponseData[] | null;

export interface StoreState {
	posts: PostsState;
}

export const INITIAL_STATE: StoreState = {
	posts: null,
};

export const initializeStore = (preloadedState?: StoreState) => {
	const isInBrowser = checkIsInBrowser();
	if (!isInBrowser) {
		return initStore(preloadedState);
	}

	let combinedStore = store ?? initStore(preloadedState);

	// After navigating to a page with an initial Redux state, merge that state
	// with the current state in the store, and create a new store
	if (preloadedState && store) {
		combinedStore = initStore({
			...store.getState(),
			...preloadedState,
		});
		// Reset the current store
		store = undefined;
	}

	// Create the store once in the client
	if (!store) {
		store = combinedStore;
	}

	return combinedStore;
};

export const useStore = (initialState: StoreState) => {
	const store = useMemo(() => initializeStore(initialState), [initialState]);
	return store;
};

function initStore(preloadedState = INITIAL_STATE) {
	return createStore<StoreState, AllActions, unknown, unknown>(
		reducers,
		preloadedState
	);
}

const checkIsInBrowser = () => {
	return typeof window !== undefined;
};
