import {
	SignUpForm as SignUpFormPresentational,
	SignUpFormValues,
} from "@presentational/Forms/SignUpForm";
import { useAlerts } from "components/hooks/useAlerts";
import { useAuth } from "components/hooks/useAuth";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useFormState } from "react-form";

export const SignUpForm = () => {
	const form = useFormState<SignUpFormValues>({
		values: {
			password: "",
			username: "",
		},
	});

	const auth = useAuth();
	const [loading, setLoading] = useState(false);
	const alerts = useAlerts();
	const router = useRouter();

	const onSubmit = useCallback(async () => {
		try {
			setLoading(true);
			await auth.signup(form.values.username, form.values.password);
			alerts.createAlert({
				type: "SUCCESS",
				message: "You can now log in!",
				expiry: 5000,
			});
			router.push("/login");
		} catch (e) {
			alerts.createAlert({
				type: "ERROR",
				message: e.message,
				expiry: 5000,
			});
		} finally {
			setLoading(false);
		}
	}, [form.values, auth, router, alerts]);

	return (
		<SignUpFormPresentational
			loading={loading}
			values={form.values}
			signinLink="/login"
			onChange={form.setValues}
			onSubmit={onSubmit}
		/>
	);
};
