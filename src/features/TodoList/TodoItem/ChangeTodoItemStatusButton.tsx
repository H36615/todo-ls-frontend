import React from "react";
import InfoIcon from "../../../icons/InfoIcon";

export default function ChangeTodoItemStatusButton(): JSX.Element {
	return (
		<div className="">
			<button
				// disabled={props.disabled}
				// type={props.type || undefined}
				className={`items-center mx-auto flex-shrink-0 flex items-center
				justify-center h-12 w-12 rounded-full bg-blue-500 bg-opacity-10
				focus:outline-none
				sm:mx-0 sm:h-10 sm:w-10
				
				`}
			// ${props.disabled ? "" : "hover:bg-opacity-30"}
			// onClick={props.onClick}
			>
				<InfoIcon/>
			</button>
		</div>
	);
}