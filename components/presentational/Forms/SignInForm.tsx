import { PasswordInput } from "@presentational/Input/PasswordInput";
import { Link } from "@presentational/Link";
import { Typography } from "@presentational/Typography";
import { FormProviderProps } from "react-form";
import styled from "styled-components";
import { Button } from "../Button";
import { TextInput } from "../Input/TextInput";
import { Paper } from "../Paper";
import { BaseForm } from "./BaseForm";

export interface SignInFormValues {
	username: string;
	password: string;
}

export interface SignInFormProps extends FormProviderProps<SignInFormValues> {
	onSubmit: () => void;
	loading?: boolean;
	signupLink: string;
}

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

const StyledBaseForm = styled(BaseForm)`
	display: grid;
	grid-gap: 3rem;
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		"username username"
		"password password"
		"submit-button submit-button";
`;
const FooterContainer = styled.div`
	margin-top: 1rem;
	display: flex;
`;

export const SignInForm = ({
	onSubmit,
	loading,
	signupLink,
	...formProps
}: SignInFormProps) => {
	return (
		<Container>
			<StyledBaseForm title="Sign In" {...formProps}>
				<UsernameInput name="username" label="Username" />
				<StyledPasswordInput name="password" label="Password" />
				<SubmitButton loading={loading} onClick={onSubmit} submit>
					Sign In
				</SubmitButton>
			</StyledBaseForm>
			<FooterContainer>
				<Typography>
					Don&apos;t have an account yet?{" "}
					<Link variant="underlined" to={signupLink}>
						Signup instead...
					</Link>
				</Typography>
			</FooterContainer>
		</Container>
	);
};
