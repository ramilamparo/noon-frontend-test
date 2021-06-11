import { Auth } from "@utils/client/api/Auth";
import { useCallback } from "react";

export const useAuth = () => {
	const login = useCallback(async (username: string, password: string) => {
		await Auth.login(username, password);
	}, []);

	const logout = useCallback(async () => {
		await Auth.logout();
	}, []);

	const signup = useCallback(async (username: string, password: string) => {
		await Auth.signup(username, password);
	}, []);

	return {
		login,
		logout,
		signup,
	};
};
