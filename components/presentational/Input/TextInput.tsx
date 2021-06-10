import { ReactNode, useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { useField } from "react-form";
import { BaseInput } from "./BaseInput";
import { Typography } from "../Typography";
import classNames from "classnames";

export interface TextInputProps {
	type?: "text" | "email" | "password";
	name: string;
	label: string;
	className?: string;
	placeholder?: string;
	required?: boolean;
	endAdornment?: ReactNode;
}

export const baseInputStyle = css`
	${Typography.getStyle("base")}
`;

const StyledInput = styled.input`
	${baseInputStyle}
	background-color: white;
	border: 1px solid gray;
	padding: 0 1rem;
	border-radius: 0.3rem;
	outline: none;

	&:active,
	&:focus {
		border-color: ${(p) => p.theme.palette.primary.main};
	}
`;

export const TextInput = ({
	name,
	label,
	className,
	placeholder,
	required,
	type = "text",
	endAdornment,
}: TextInputProps) => {
	const field = useField(name, { defaultValue: "" });

	const [hasFocus, setHasFocus] = useState(false);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
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
			className={classNames(className, "text-input")}
			hasValue={Boolean(field.value)}
			hasFocus={hasFocus}
			endAdornment={endAdornment}
		>
			<StyledInput
				onFocus={handleFocus}
				onBlur={handleBlur}
				id={name}
				required={required}
				placeholder={placeholder}
				type={type}
				value={field.value}
				onChange={handleChange}
			/>
		</BaseInput>
	);
};
