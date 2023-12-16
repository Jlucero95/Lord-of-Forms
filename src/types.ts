import { ComponentProps } from "react";

export type UserInformation = {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
}

export type PhoneInputState = [string, string, string, string];

export type TextInput = {
	label: string;
	inputProps: ComponentProps<"input">;
};