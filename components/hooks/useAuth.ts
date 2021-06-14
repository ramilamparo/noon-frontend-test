import { Auth } from "@utils/client/api/Auth";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "store/actions/types";
import { StoreState } from "store/state";
import { Auth as AuthAction } from "store/actions/Auth";

export const useAuth = () => {
	const auth = useSelector(({ auth }: StoreState) => auth);
	const dispatch = useDispatch<AppDispatch>();

	const login = useCallback(
		async (username: string, password: string) => {
			await Auth.login(username, password);
			dispatch(AuthAction.set(true));
		},
		[dispatch]
	);

	const logout = useCallback(async () => {
		await Auth.logout();
		dispatch(AuthAction.set(false));
	}, [dispatch]);

	const signup = useCallback(async (username: string, password: string) => {
		await Auth.signup(username, password);
	}, []);

	useEffect(() => {
		const checkAuth = async () => {
			dispatch(AuthAction.set(await Auth.isLoggedIn()));
		};
		checkAuth();
	}, [dispatch]);

	return {
		login,
		logout,
		signup,
		isLoggedIn: auth === null ? null : Boolean(auth),
	};
};
