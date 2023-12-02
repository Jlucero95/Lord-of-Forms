import { allCities } from "./all-cities";


export function isEmailValid(input: string) {
	// eslint-disable-next-line no-useless-escape
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return !regex.test(input)
}

export function isPhoneValid(input: string[]) {
	const checkNumberAndEmptyString = /^(\s*|\d+|[0-9][0-9])$/;
	const joinedInput = input.join("");
	return checkNumberAndEmptyString.test(joinedInput) && joinedInput.length != 7
		? true
		: false;
}

export function isInputValid(input:string) {
	const checkInputLength = input.length > 1;
	return !checkInputLength ? true : false;
}

export const isCityValid = (input:string) => {
		const checkInputValue = allCities.includes(input) ? true : false;
		return !checkInputValue ? true : false;
	};