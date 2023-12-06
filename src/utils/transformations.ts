export const capitalize = (input: string) => {
    const splitStr = input.split("");
    const [firstLetter, ...rest] =splitStr
    const capitalizeFirstLetter = firstLetter.toUpperCase();
    const lowerCaseRestOfWord = rest.map((char) => {
        return char.toLowerCase()
    })
    const capitalizedWord = capitalizeFirstLetter +lowerCaseRestOfWord.join("")
    return capitalizedWord
}

export const formatPhoneNumber = (input: string) => {
    const regex = /\d{2}/g;
    const formattedNumber = input.replace(regex, "$&-");
    return formattedNumber
}