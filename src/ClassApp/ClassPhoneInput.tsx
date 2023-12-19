import { ChangeEvent, Dispatch, SetStateAction, createRef } from "react";
import { Component } from "react";
import { PhoneInputState } from "../types";

export class ClassPhoneInput extends Component<{
	phoneInputProps: PhoneInputState;
	setPhoneInputState: Dispatch<SetStateAction<PhoneInputState>>;
}> {
	refList = [
		createRef<HTMLInputElement>(),
		createRef<HTMLInputElement>(),
		createRef<HTMLInputElement>(),
		createRef<HTMLInputElement>(),
	];

	createOnChangeHandler =
		(index: number) => (e: ChangeEvent<HTMLInputElement>) => {
			const lengths = [2, 2, 2, 1];
			const currentMaxLength = lengths[index];
			const nextRef = this.refList[index + 1];
			const prevRef = this.refList[index - 1];
			const value = e.target.value;

			const checkNumberAndEmptyString = /^(\s*|\d+|[0-9][0-9])$/;

			const shouldGoToNextRef =
				currentMaxLength === value.length && nextRef?.current;

			const shouldGoToPrevRef = value.length === 0 && prevRef?.current;

			const newState = this.props.phoneInputProps.map(
				(phoneInput: string, phoneInputIndex: number) =>
					index === phoneInputIndex ? e.target.value : phoneInput
			) as PhoneInputState;

			if (shouldGoToNextRef) {
				nextRef.current?.focus();
			}

			if (shouldGoToPrevRef) {
				prevRef.current?.focus();
			}

			if (
				checkNumberAndEmptyString.test(value) &&
				!value.includes(" ") &&
				value.length <= currentMaxLength
			) {
				this.props.setPhoneInputState(newState as PhoneInputState);
			}
		};

	render() {
		const { phoneInputProps } = this.props;

		return (
			<div className="input-wrap">
				<label htmlFor="phone">Phone:</label>
				<div id="phone-input-wrap">
					<input
						type="text"
						id="phone-input-1"
						placeholder="55"
						ref={this.refList[0]}
						onChange={this.createOnChangeHandler(0)}
						value={phoneInputProps[0]}
					/>
					-
					<input
						type="text"
						id="phone-input-2"
						placeholder="55"
						ref={this.refList[1]}
						onChange={this.createOnChangeHandler(1)}
						value={phoneInputProps[1]}
					/>
					-
					<input
						type="text"
						id="phone-input-3"
						placeholder="55"
						ref={this.refList[2]}
						onChange={this.createOnChangeHandler(2)}
						value={phoneInputProps[2]}
					/>
					-
					<input
						type="text"
						id="phone-input-4"
						placeholder="5"
						maxLength={1}
						ref={this.refList[3]}
						onChange={this.createOnChangeHandler(3)}
						value={phoneInputProps[3]}
					/>
				</div>
			</div>
		);
	}
}
