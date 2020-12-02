import React from "react";

interface ButtonProps {
	onClick: () => void,
	children: React.ReactNode,
}

export default function Button({ children, onClick }: ButtonProps): JSX.Element {
	return (
		<div className="MainContent">
			<button
				className="items-center rounded-md
				px-3 py-1
				text-indigo-500
				bg-indigo-500 bg-opacity-20
				hover:bg-indigo-500 hover:bg-opacity-30
				focus:outline-none"
				style={{ minWidth: "10px" }}
				onClick={onClick}>
				<p className="bold">{children}</p>
			</button>
		</div>
	);
}