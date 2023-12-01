import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput, PhoneInputState } from "./FunctionalPhoneInput";
import {
	isCityValid,
	isEmailValid,
	isInputValid,
	isPhoneValid,
} from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = () => {
	const [firstNameInput, setFirstNameInput] = useState("");
	const [lastNameInput, setLastNameInput] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [cityInput, setCityInput] = useState("");
	const [phoneInput, setPhoneInput] = useState<PhoneInputState>([
		"",
		"",
		"",
		"",
	]);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const shouldShowPhoneError = isSubmitted && isPhoneValid(phoneInput);

	const shouldShowInputError =
		isSubmitted && isInputValid(firstNameInput || lastNameInput);

	const shouldShowCityError = isSubmitted && isCityValid(cityInput);

	const shouldShowEmailError = isSubmitted && isEmailValid(emailInput);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				setIsSubmitted(true);
			}}
		>
			<u>
				<h3>User Information Form</h3>
			</u>

			{/* first name input */}
			<FunctionalTextInput
				label={"First Name"}
				inputProps={{
					onChange: (e) => {
						setFirstNameInput(e.target.value);
					},
					value: firstNameInput,
					placeholder: "Bilbo",
				}}
			/>

			<ErrorMessage
				message={firstNameErrorMessage}
				show={shouldShowInputError}
			/>

			{/* last name input */}
			<FunctionalTextInput
				label={"Last Name"}
				inputProps={{
					onChange: (e) => {
						setLastNameInput(e.target.value);
					},
					value: lastNameInput,
					placeholder: "Baggins",
				}}
			/>

			<ErrorMessage
				message={lastNameErrorMessage}
				show={shouldShowInputError}
			/>

			{/* Email Input */}
			<FunctionalTextInput
				label={"Email"}
				inputProps={{
					onChange: (e) => {
						setEmailInput(e.target.value);
					},
					value: emailInput,
					placeholder: "bilbo-baggins@adventurehobbits.net",
				}}
			/>

			<ErrorMessage
				message={emailErrorMessage}
				show={shouldShowEmailError}
			/>

			{/* City Input */}
			<FunctionalTextInput
				label={"City"}
				inputProps={{
					onChange: (e) => {
						setCityInput(e.target.value);
					},
					value: cityInput,
					placeholder: "Hobbiton",
					list: "cities",
				}}
			/>

			<ErrorMessage
				message={cityErrorMessage}
				show={shouldShowCityError}
			/>
			{/* Phone Input */}
			<FunctionalPhoneInput
				phoneInputState={phoneInput}
				setPhoneInputState={setPhoneInput}
			/>
			<ErrorMessage
				message={phoneNumberErrorMessage}
				show={shouldShowPhoneError}
			/>

			<input
				type="submit"
				value="Submit"
			/>
		</form>
	);
};
