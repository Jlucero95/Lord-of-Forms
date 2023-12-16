import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { ClassTextInput } from "./ClassTextInput";
import {
	isCityValid,
	isEmailValid,
	isInputValid,
	isPhoneValid,
} from "../utils/validations";
import { UserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<{
	handleUserInformation: (userInformation: UserInformation) => void;
}> {
	state = {
		firstNameInput: "",
		lastNameInput: "",
		emailInput: "",
		cityInput: "",
		phoneInput: ["", "", "", ""],
		isSubmitted: false,
	};

	handlePhoneInputChange = (index: number) => (value: string) => {
		this.setState(() => {
			const newPhoneInput = [...this.state.phoneInput];
			newPhoneInput[index] = value;
			return { phoneInput: newPhoneInput };
		});
	};
	render() {
		const {
			firstNameInput,
			lastNameInput,
			emailInput,
			cityInput,
			phoneInput,
			isSubmitted,
		} = this.state;
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

		const shouldAlert = () => {
			if (!isAllUserInformationValid) {
				alert("bad data input");
			} else {
				this.setState({
					firstNameInput: "",
					lastNameInput: "",
					emailInput: "",
					cityInput: "",
					phoneInput: ["", "", "", ""],
					isSubmitted: false,
				});
				this.props.handleUserInformation({
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
					this.setState({ isSubmitted: true });
					shouldAlert();
				}}
			>
				<u>
					<h3>User Information Form</h3>
				</u>

				{/* first name input */}
				<ClassTextInput
					label="First Name"
					inputProps={{
						onChange: (e) => {
							this.setState({ firstNameInput: e.target.value });
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
				<ClassTextInput
					label="Last Name"
					inputProps={{
						onChange: (e) => {
							this.setState({ lastNameInput: e.target.value });
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
				<ClassTextInput
					label="Email"
					inputProps={{
						onChange: (e) => {
							this.setState({ emailInput: e.target.value });
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
				<ClassTextInput
					label="City"
					inputProps={{
						onChange: (e) => {
							this.setState({ cityInput: e.target.value });
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

				<ClassPhoneInput
					phoneInputState={[
						phoneInput[0],
						phoneInput[1],
						phoneInput[2],
						phoneInput[3],
					]}
					setPhoneInputState={this.handlePhoneInputChange}
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
	}
}
