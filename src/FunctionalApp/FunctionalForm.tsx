import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import {
	isCityValid,
	isEmailValid,
	isInputValid,
	isPhoneValid,
} from "../utils/validations";
import { PhoneInputState, UserInformation } from "../types";
import {
	cityErrorMessage,
	emailErrorMessage,
	firstNameErrorMessage,
	lastNameErrorMessage,
	phoneNumberErrorMessage,
} from "../utils/InputErrorMessages";

export const FunctionalForm = ({
	handleUserInformation,
}: {
	handleUserInformation: (userInformation: UserInformation) => void;
}) => {
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

	const shouldShowNameInputError = (input: string) => {
		return isSubmitted && !isInputValid(input);
	};
	const shouldShowEmailError = isSubmitted && !isEmailValid(emailInput);

	const shouldShowCityError = isSubmitted && !isCityValid(cityInput);

	const shouldShowPhoneError = isSubmitted && !isPhoneValid(phoneInput);

	const isAllUserInformationValid =
		isInputValid(firstNameInput) &&
		isInputValid(lastNameInput) &&
		isEmailValid(emailInput) &&
		isCityValid(cityInput) &&
		isPhoneValid(phoneInput) &&
		isSubmitted;

	const shouldAlertOrReset = () => {
		if (!isAllUserInformationValid) {
			alert("bad data input");
		} else {
			setFirstNameInput(""),
				setLastNameInput(""),
				setEmailInput(""),
				setCityInput(""),
				setPhoneInput(["", "", "", ""]),
				setIsSubmitted(false),
				handleUserInformation({
					firstName: firstNameInput,
					lastName: lastNameInput,
					email: emailInput,
					city: cityInput,
					phone: phoneInput.join(""),
				});
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				setIsSubmitted(true);
				shouldAlertOrReset();
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
				show={shouldShowNameInputError(firstNameInput)}
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
				show={shouldShowNameInputError(lastNameInput)}
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
