import {
	SignInForm as SignInFormPresentational,
	SignInFormValues,
} from "@presentational/Forms/SignInForm";
import { useAlerts } from "components/hooks/useAlerts";
import { useAuth } from "components/hooks/useAuth";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useFormState } from "react-form";

export const SignInForm = () => {
	const form = useFormState<SignInFormValues>({
		values: {
			username: "",
			password: "",
		},
	});
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const auth = useAuth();
	const alerts = useAlerts();

	const onSubmit = useCallback(async () => {
		try {
			setLoading(true);
			await auth.login(form.values.username, form.values.password);
			router.push("/");
		} catch (e) {
			alerts.createAlert({
				type: "ERROR",
				message: e.message,
				expiry: 5000,
			});
		} finally {
			setLoading(false);
		}
	}, [auth, form.values, router, alerts]);

	return (
		<SignInFormPresentational
			values={form.values}
			onChange={form.setValues}
			loading={loading}
			signupLink="/signup"
			onSubmit={onSubmit}
		/>
	);
};
