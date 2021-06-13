import { RichTextInput } from "@presentational/Input/RichTextInput";
import { FormProviderProps } from "react-form";
import styled from "styled-components";
import { Button } from "../Button";
import { TextInput } from "../Input/TextInput";
import { Paper } from "../Paper";
import { BaseForm } from "./BaseForm";

export interface PostCreateFormValues {
	title: string;
	imageSrc: string;
	description: string;
}

export interface PostCreateFormProps
	extends FormProviderProps<PostCreateFormValues> {
	onSubmit: () => void;
	loading?: boolean;
	className?: string;
}

const TitleInput = styled(TextInput)`
	grid-area: title;
`;

const SubmitButton = styled(Button)`
	grid-area: submit-button;
	justify-content: center;
`;

const Container = styled(Paper)`
	display: flex;
	flex-direction: column;
	padding: 2rem;
`;

const StyledBaseForm = styled(BaseForm)`
	display: grid;
	grid-gap: 3rem;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 2fr 1fr;
	grid-template-areas:
		"title imageSrc"
		"description description"
		"submit-button submit-button";
`;

const ImageURLInput = styled(TextInput)`
	grid-area: imageSrc;
`;

const DescriptionInput = styled(RichTextInput)`
	grid-area: description;
	height: 100%;
`;

export const PostCreateForm = ({
	onSubmit,
	loading,
	className,
	...formProps
}: PostCreateFormProps) => {
	return (
		<Container className={className}>
			<StyledBaseForm title="Create a Post!" {...formProps}>
				<TitleInput name="title" label="Title" />
				<ImageURLInput name="imageSrc" label="Image URL" />
				<DescriptionInput name="description" label="Description" />
				<SubmitButton loading={loading} onClick={onSubmit} submit>
					Submit Post
				</SubmitButton>
			</StyledBaseForm>
		</Container>
	);
};
