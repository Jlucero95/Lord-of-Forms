import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from "react";

export type PhoneInputState = [string, string, string, string];

export const FunctionalPhoneInput = ({
	phoneInputState,
	setPhoneInputState,
}: {
	phoneInputState: PhoneInputState;
	setPhoneInputState: Dispatch<SetStateAction<PhoneInputState>>;
}) => {
	const refs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];
	const ref0 = refs[0];
	const ref1 = refs[1];
	const ref2 = refs[2];
	const ref3 = refs[3];
	const createOnChangeHandler =
		(index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
		(e) => {
			const lengths = [2, 2, 2, 1];
			const currentMaxLength = lengths[index];
			const nextRef = refs[index + 1];
			const prevRef = refs[index - 1];
			const value = e.target.value;

			const checkNumberAndEmptyString = /^(\s*|\d+|[0-9][0-9])$/;

			const shouldGoToNextRef =
				currentMaxLength === value.length && nextRef?.current;

			const shouldGoToPrevRef = value.length === 0 && prevRef?.current;

			const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
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
				setPhoneInputState(newState);
			}
		};

	return (
		<div className="input-wrap">
			<label htmlFor="phone">Phone:</label>
			<div id="phone-input-wrap">
				<input
					type="text"
					id="phone-input-1"
					placeholder="55"
					ref={ref0}
					onChange={createOnChangeHandler(0)}
					value={phoneInputState[0]}
				/>
				-
				<input
					type="text"
					id="phone-input-2"
					placeholder="55"
					ref={ref1}
					onChange={createOnChangeHandler(1)}
					value={phoneInputState[1]}
				/>
				-
				<input
					type="text"
					id="phone-input-3"
					placeholder="55"
					ref={ref2}
					onChange={createOnChangeHandler(2)}
					value={phoneInputState[2]}
				/>
				-
				<input
					type="text"
					id="phone-input-4"
					placeholder="5"
					maxLength={1}
					ref={ref3}
					onChange={createOnChangeHandler(3)}
					value={phoneInputState[3]}
				/>
			</div>
		</div>
	);
};
