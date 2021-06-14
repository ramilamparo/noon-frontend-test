import {
	SignUpForm as SignUpFormPresentational,
	SignUpFormValues,
} from "@presentational/Forms/SignUpForm";
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
	const router = useRouter();

	const onSubmit = useCallback(async () => {
		setLoading(true);
		await auth.signup(form.values.username, form.values.password);
		router.push("/login");
		setLoading(true);
	}, [form.values, auth, router]);

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
