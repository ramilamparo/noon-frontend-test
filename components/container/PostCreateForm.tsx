import {
	PostCreateForm as PostCreateFormPresentational,
	PostCreateFormValues,
} from "@presentational/Forms/PostCreateForm";
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

	const onSubmit = useCallback(() => {
		setLoading(true);
		posts.create(form.values);
		setLoading(false);
	}, [posts, form.values]);

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
