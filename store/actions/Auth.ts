import { AuthState } from "store/state";
import { ActionType, SetAuthAction } from "./types";

export abstract class Auth {
	public static set(auth: AuthState): SetAuthAction {
		return { payload: auth, type: ActionType.SET_AUTH };
	}
}
