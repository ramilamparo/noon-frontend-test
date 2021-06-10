import { PasswordInput } from "@presentational/Input/PasswordInput";
import { Link } from "@presentational/Link";
import { Typography } from "@presentational/Typography";
import { FormProviderProps } from "react-form";
import styled from "styled-components";
import { Button } from "../Button";
import { TextInput } from "../Input/TextInput";
import { Paper } from "../Paper";
import { BaseForm } from "./BaseForm";
export interface SignUpFormValues {
	username: string;
	password: string;
}

export interface SignUpFormProps extends FormProviderProps<SignUpFormValues> {
	onSubmit: () => void;
	loading?: boolean;
	signinLink: string;
}

const StyledBaseForm = styled(BaseForm)`
	display: grid;
	grid-gap: 3rem;
	grid-template-columns: 1fr;
	grid-template-areas:
		"username"
		"password"
		"submit-button";
`;

const UsernameInput = styled(TextInput)`
	grid-area: username;
`;

const StyledPasswordInput = styled(PasswordInput)`
	grid-area: password;
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

const FooterContainer = styled.div`
	margin-top: 1rem;
	display: flex;
`;

export const SignUpForm = ({
	onSubmit,
	loading,
	signinLink,
	...formProps
}: SignUpFormProps) => {
	return (
		<Container variant="lvl2">
			<StyledBaseForm title="Sign Up" {...formProps}>
				<UsernameInput name="username" label="Username" />
				<StyledPasswordInput name="password" label="Password" />
				<SubmitButton onClick={onSubmit} submit loading={loading}>
					Sign Up
				</SubmitButton>
			</StyledBaseForm>
			<FooterContainer>
				<Typography>
					Already have an account?{" "}
					<Link variant="underlined" to={signinLink}>
						Signin instead...
					</Link>
				</Typography>
			</FooterContainer>
		</Container>
	);
};
