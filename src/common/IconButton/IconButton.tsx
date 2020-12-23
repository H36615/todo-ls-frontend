/* eslint-disable max-len */
import React from "react";

interface IconButtonProps {
	/** E.g. button in form does not need to pass this if type is 'submit'. */
	onClick: undefined | (() => void),
	children: React.ReactNode,
	disabled?: boolean,
	type?: "button" | "submit" | "reset",
}

export default function IconButton(props: IconButtonProps): JSX.Element {
	return (
		<div className="Button">
			<button
				disabled={props.disabled}
				type={props.type || undefined}
				className={`items-center mx-auto flex-shrink-0 flex items-center
				justify-center h-12 w-12 rounded-full bg-red-700 bg-opacity-0
				focus:outline-none
				sm:mx-0 sm:h-10 sm:w-10
				${props.disabled ? "" : "hover:bg-opacity-10"}`}
				style={{ minWidth: "10px" }}
				onClick={props.onClick}>
				{props.children}
			</button>
		</div>
	);
}