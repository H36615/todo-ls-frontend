import React from "react";
import DelayedIcon from "../../../icons/DelayedIcon";
import DoneIcon from "../../../icons/DoneIcon";
import InProgressIcon from "../../../icons/InProgressIcon";
import ToDoIcon from "../../../icons/ToDoIcon";
import { TodoItemStatus } from "../../../utils/HttpClient/Interfaces";

export interface ChangeTodoItemStatusButtonProps {
	status: TodoItemStatus,
	/**
	 * The status the user is trying to change the status to, but might
	 * have not been succeeded yet so.
	 */
	currentOrPendingStatus: TodoItemStatus,
	fetchingStatus: boolean,
	nextStatus: () => void,
	disabled?: boolean,
}

export default function ChangeTodoItemStatusButton(
	props: ChangeTodoItemStatusButtonProps
): JSX.Element {

	function currentIcon() {
		if (props.currentOrPendingStatus === TodoItemStatus.todo)
			return <ToDoIcon />;
		if (props.currentOrPendingStatus === TodoItemStatus.inProgres)
			return <InProgressIcon />;
		if (props.currentOrPendingStatus === TodoItemStatus.done)
			return <DoneIcon />;
		return <DelayedIcon />;
	}

	function getStatusColorRules() {
		if (props.currentOrPendingStatus === TodoItemStatus.todo)
			return "bg-yellow-500 border-yellow-500";
		if (props.currentOrPendingStatus === TodoItemStatus.inProgres)
			return "bg-blue-500 border-blue-500";
		if (props.currentOrPendingStatus === TodoItemStatus.done)
			return "bg-green-500 border-green-500";
		return "bg-red-500 border-red-500";
	}

	return (
		<div className="">
			<button
				disabled={props.disabled}
				className={`
				items-center mx-auto flex-shrink-0 flex
				justify-center h-10 w-10
				focus:outline-none
				${props.disabled && "opacity-30"}
				relative
				`}
				onClick={props.nextStatus}
			>
				{/* Background & spinner */}
				<div className={`animate-spin
				h-full w-full rounded-full
				bg-opacity-10
				${!props.disabled && "hover:bg-opacity-30"}
				border-4
				absolute
				${props.fetchingStatus ? "border-dashed" : "border-none"}
				${getStatusColorRules()}
				`} />
				{currentIcon()}
			</button>
		</div>
	);
}