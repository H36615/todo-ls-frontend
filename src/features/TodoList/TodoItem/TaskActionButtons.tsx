import React from "react";
import Button from "../../../common/Button/Button";

interface TaskActionButtonsProps {
	disabled: boolean,
	cancelPressed: () => void,
}

export default function TaskActionButtons(props: TaskActionButtonsProps): JSX.Element {
	return (
		<div className="ml-1 w-14">
			<Button onClick={undefined}
				disabled={props.disabled}
				type="submit"
				classNames={`
				whitespace-nowrap
				w-full px-2
				rounded-md bg-blue-50 bg-opacity-80
				border-blue-200
				text-blue-800
				${props.disabled ? "opacity-50" : "hover:bg-blue-100 hover:bg-opacity-80"}
				m-0`}>
				Save
			</Button>
			<Button onClick={props.cancelPressed}
				disabled={props.disabled}
				type="submit"
				classNames={`text-xs
				whitespace-nowrap
				w-full px-2
				rounded-md bg-white bg-opacity-80
				${props.disabled ? "opacity-50" : "hover:bg-gray-200 hover:bg-opacity-30"}
				text-gray-700
				m-0`}>
				Cancel
			</Button>
		</div>
	);
}