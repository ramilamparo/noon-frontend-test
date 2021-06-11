import { useCallback, useState } from "react";
import { useField } from "react-form";
import styled from "styled-components";
import { BaseInput } from "./BaseInput";
import { baseInputStyle } from "./TextInput";

export interface RichTextInputProps {
	className?: string;
	label: string;
	name: string;
	required?: boolean;
}

const StyledInput = styled.textarea`
	${baseInputStyle}
	background-color: white;
	border: 1px solid gray;
	padding: 0 1rem;
	border-radius: 0.3rem;
	outline: none;
	padding: 1rem;

	&:active,
	&:focus {
		border-color: ${(p) => p.theme.palette.primary.main};
	}
`;

export const RichTextInput = ({
	name,
	label,
	className,
	required,
}: RichTextInputProps) => {
	const field = useField(name, { defaultValue: "" });

	const [hasFocus, setHasFocus] = useState(false);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			field.setFieldValue(e.target.value);
		},
		[field]
	);

	const handleFocus = useCallback(() => {
		setHasFocus(true);
	}, []);

	const handleBlur = useCallback(() => {
		field.onBlur();
		setHasFocus(false);
	}, [field]);

	return (
		<BaseInput
			htmlFor={name}
			label={label}
			className={className}
			hasValue={Boolean(field.value)}
			hasFocus={hasFocus}
		>
			<StyledInput
				onFocus={handleFocus}
				onBlur={handleBlur}
				id={name}
				required={required}
				value={field.value}
				onChange={handleChange}
			/>
		</BaseInput>
	);
};
