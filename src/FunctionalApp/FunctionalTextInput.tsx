import { ComponentProps } from "react";

type TextInput = {
	label: string;
	inputProps: ComponentProps<"input">;
};

export const FunctionalTextInput = ({ label, inputProps }: TextInput) => {
	return (
		<div className="input-wrap">
			<label>{label}:</label>
			<input
				type="text"
				{...inputProps}
			/>
		</div>
	);
};
