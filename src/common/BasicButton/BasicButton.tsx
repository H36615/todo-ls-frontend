import React from "react";
import Button from "../Button/Button";

interface BasicButtonProps {
	/** E.g. button in form does not need to pass this if type is 'submit'. */
	onClick: undefined | (() => void),
	children: React.ReactNode,
	classNames?: string,
	disabled?: boolean,
	type?: "button" | "submit" | "reset",
}

export default function BasicButton(props: BasicButtonProps): JSX.Element {
	return (
		<div className="BasicButton">
			<Button disabled={props.disabled}
				type={props.type}
				onClick={props.onClick}
				classNames={`rounded-md
				text-gray-700 bg-white bg-opacity-80
				px-3 py-1
				border
				${props.disabled ? "opacity-50" : "hover:bg-gray-200 hover:bg-opacity-30"}
				${props.classNames}`}
			>
				{props.children}
			</Button>
		</div>
	);
}