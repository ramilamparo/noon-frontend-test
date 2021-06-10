import {
	SignInForm as SignInFormPresentational,
	SignInFormValues,
} from "@presentational/Forms/SignInForm";
import { useAuth } from "components/hooks/useAuth";
import { useCallback, useState } from "react";
import { useFormState } from "react-form";

export const SignInForm = () => {
	const form = useFormState<SignInFormValues>({
		values: {
			username: "",
			password: "",
		},
	});
	const [loading, setLoading] = useState(false);
	const auth = useAuth();
	const onSubmit = useCallback(async () => {
		setLoading(true);
		await auth.login(form.values.username, form.values.password);
		setLoading(false);
	}, [auth, form.values]);

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
