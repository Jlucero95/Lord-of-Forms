import { TextInput } from "../types";

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
