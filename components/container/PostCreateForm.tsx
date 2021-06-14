import {
	PostCreateForm as PostCreateFormPresentational,
	PostCreateFormValues,
} from "@presentational/Forms/PostCreateForm";
import { useAlerts } from "components/hooks/useAlerts";
import { usePosts } from "components/hooks/usePosts";
import { useCallback, useState } from "react";
import { useFormState } from "react-form";

export interface PostCreateFormProps {
	className?: string;
}

export const PostCreateForm = ({ className }: PostCreateFormProps) => {
	const form = useFormState<PostCreateFormValues>({
		values: {
			description: "",
			imageSrc: "",
			title: "",
		},
	});
	const posts = usePosts();

	const [loading, setLoading] = useState(false);

	const alerts = useAlerts();

	const onSubmit = useCallback(async () => {
		try {
			setLoading(true);
			await posts.create(form.values);
			alerts.createAlert({
				message: "Post created!",
				type: "SUCCESS",
			});
		} catch (e) {
			alerts.createAlert({
				message: e.message,
				type: "ERROR",
			});
		} finally {
			setLoading(false);
		}
	}, [posts, form.values, alerts]);

	return (
		<PostCreateFormPresentational
			onChange={form.setValues}
			values={form.values}
			loading={loading}
			onSubmit={onSubmit}
			className={className}
		/>
	);
};
