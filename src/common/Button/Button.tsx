import React from "react";

interface ButtonProps {
	onClick: () => void,
	children: React.ReactNode,
}

export default function Button({ children, onClick }: ButtonProps): JSX.Element {
	return (
		<div className="Button">
			<button
				className="items-center rounded-md
				px-3 py-1
				text-gray-700
				bg-white bg-opacity-80
				hover:bg-gray-200 hover:bg-opacity-30
				focus:outline-none
				border"
				style={{ minWidth: "10px" }}
				onClick={onClick}>
				<p className="bold">{children}</p>
			</button>
		</div>
	);
}