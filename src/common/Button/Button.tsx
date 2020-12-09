import React from "react";

interface ButtonProps {
	/** E.g. button in form does not need to pass this if type is 'submit'. */
	onClick: undefined | (() => void),
	children: React.ReactNode,
	classNames?: string,
	disabled?: boolean,
	type?: "button" | "submit" | "reset",
}

export default function Button(props: ButtonProps): JSX.Element {
	return (
		<div className="Button">
			<button
				disabled={props.disabled}
				type={props.type || undefined}
				className={`items-center rounded-md
				text-gray-700 bg-white bg-opacity-80
				px-3 py-1 border border-gray-300
				focus:outline-none
				border ${props.disabled ? "opacity-50" : "hover:bg-gray-200 hover:bg-opacity-30"}
				${props.classNames}`}
				style={{ minWidth: "10px" }}
				onClick={props.onClick}>
				<p className="bold">{props.children}</p>
			</button>
		</div>
	);
}