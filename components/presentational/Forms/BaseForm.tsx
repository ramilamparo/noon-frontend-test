import { FormEvent, ReactNode, useCallback } from "react";
import { FormProvider, FormProviderProps } from "react-form";
import styled from "styled-components";
import { Typography } from "../Typography";

export interface BaseFormProps<T extends object> extends FormProviderProps<T> {
	title?: string;
	className?: string;
	children: ReactNode;
	onSubmit?: () => void;
}

const Title = styled(Typography)`
	margin-bottom: 2rem;
`;

const Form = styled.form`
	display: grid;
	grid-gap: 3rem;
`;

export const BaseForm = <T extends object>({
	title,
	children,
	className,
	onSubmit,
	...formProps
}: BaseFormProps<T>) => {
	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			onSubmit && onSubmit();
		},
		[onSubmit]
	);

	return (
		<>
			{title && <Title variant="heading1">{title}</Title>}
			<FormProvider<T> {...formProps}>
				<Form onSubmit={handleSubmit} className={className}>
					{children}
				</Form>
			</FormProvider>
		</>
	);
};
