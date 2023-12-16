import { Component } from "react";
import { TextInput } from "../types";

export class ClassTextInput extends Component<TextInput> {
	render() {
		return (
			<div className="input-wrap">
				<label>{this.props.label}:</label>
				<input {...this.props.inputProps} />
			</div>
		);
	}
}
