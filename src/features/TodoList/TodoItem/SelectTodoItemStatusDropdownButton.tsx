import React from "react";
import Dropdown from "../../../common/Dropdown/Dropdown";
import { TodoItemStatus } from "../../../utils/HttpClient/Interfaces";

export interface SelectTodoItemStatusDropdownButtonProps {
	status: TodoItemStatus,
	/**
	 * The status the user is trying to change the status to, but might
	 * have not been succeeded yet so.
	 */
	currentOrPendingStatus: TodoItemStatus,
	fetchingStatus: boolean,
	changeStatus: (option: TodoItemStatus) => void,
	disabled?: boolean,
}

export default function SelectTodoItemStatusDropdownButton(
	props: SelectTodoItemStatusDropdownButtonProps
): JSX.Element {

	function getStatusText(status: TodoItemStatus) {
		if (status === TodoItemStatus.todo)
			return "To do";
		if (status === TodoItemStatus.done)
			return "Done";
		if (status === TodoItemStatus.inProgres)
			return "In progress";
		if (status === TodoItemStatus.delayed)
			return "Delayed";
		return "undefined";
	}

	function getStatusTextColor() {
		if (props.currentOrPendingStatus === TodoItemStatus.todo)
			return "text-yellow-800";
		if (props.currentOrPendingStatus === TodoItemStatus.inProgres)
			return "text-blue-800";
		if (props.currentOrPendingStatus === TodoItemStatus.done)
			return "text-green-800";
		return "text-red-800";
	}

	function getStatusColorRules() {
		if (props.currentOrPendingStatus === TodoItemStatus.todo)
			return "bg-yellow-200 border-yellow-300";
		if (props.currentOrPendingStatus === TodoItemStatus.inProgres)
			return "bg-blue-200 border-blue-300";
		if (props.currentOrPendingStatus === TodoItemStatus.done)
			return "bg-green-200 border-green-300";
		return "bg-red-200 border-red-300";
	}

	return (
		<div className="flex flex-col">
			<Dropdown<TodoItemStatus>
				disabled={props.disabled}
				buttonText={getStatusText(props.status)}
				selectionChange={props.changeStatus}
				buttonClassesNames={`
				py-1
				border
				w-20 ml-2 mr-1 font-bold
				text-sm
				rounded-lg
				${getStatusTextColor()}
				mx-1
				focus:outline-none
				${props.disabled ? "opacity-30" : "hover:bg-opacity-40"}
				${getStatusColorRules()}
				bg-opacity-5 `}
				dropdownOptions={
					[
						{
							option: getStatusText(TodoItemStatus.todo),
							value: TodoItemStatus.todo
						},
						{
							option: getStatusText(TodoItemStatus.inProgres),
							value: TodoItemStatus.inProgres
						},
						{
							option: getStatusText(TodoItemStatus.done),
							value: TodoItemStatus.done
						},
						{
							option: getStatusText(TodoItemStatus.delayed),
							value: TodoItemStatus.delayed
						},
					]
				}
			/>
		</div>
	);
}