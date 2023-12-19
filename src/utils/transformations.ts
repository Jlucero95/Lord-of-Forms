import { isInputValid } from "./validations";

export const capitalize = (input: string) => {

	if (isInputValid(input)) {
		const splitStr = input.split("");
		const [firstLetter, ...rest] = splitStr;
		const capitalizeFirstLetter = firstLetter.toUpperCase();
		const lowerCaseRestOfWord = rest.map((char) => {
			return char.toLowerCase();
		});
		const capitalizedWord =
			capitalizeFirstLetter + lowerCaseRestOfWord.join("");
		return capitalizedWord;
	} else {
		return "";
	}
};

export const formatPhoneNumber = (input: string) => {
	if (input.length === 7) {
		const regex = /\d{2}/g;
		const formattedNumber = input.replace(regex, "$&-");
		return formattedNumber;
	}
    return ""
};
