
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { of, Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import Button from "../../../common/Button/Button";
import IconButton from "../../../common/IconButton/IconButton";
import TextAreaInput from "../../../common/TextAreaInput/TextAreaInput";
import DeleteIcon from "../../../icons/DeleteIcon";
import { TodoItemStatus } from "../../../utils/HttpClient/Interfaces";
import ChangeTodoItemStatusButton from "./ChangeTodoItemStatusButton";
import SelectTodoItemStatusDropdownButton from "./SelectTodoItemStatusDropdownButton";

export interface TodoItemProps {
	id: number,
	taskText: string,
	status: TodoItemStatus,
	statusChanged: (newStatus: TodoItemStatus) => void,
	onRemove: () => void,
	submitTaskText: (text: string) => void,
}

export default function TodoItem(props: TodoItemProps): JSX.Element {

	const [isDirtyForm, setIsDirtyForm] = useState<boolean>(false);
	const [currentOrPendingStatus, setCurrentOrPendingStatus]
		= useState<TodoItemStatus>(props.status);
	const [fetchingStatus, setFetchingStatus] = useState<boolean>(false);
	const [fetchSubscription, setFetchSubscription] = useState<Subscription>();

	function validateFields(fields: { task: string }) {
		let errors = {};
		if (!fields.task || fields.task.length < 1)
			errors = { ...errors, task: "Required" };
		else if (fields.task.length > 100)
			errors = { ...errors, task: "Task must be less than 100 characters" };

		return errors;
	}

	function getNextStatus(currentStatus: TodoItemStatus) {
		if (currentStatus === TodoItemStatus.todo)
			return TodoItemStatus.inProgres;
		if (currentStatus === TodoItemStatus.inProgres)
			return TodoItemStatus.done;
		if (currentStatus === TodoItemStatus.done)
			return TodoItemStatus.delayed;
		return TodoItemStatus.todo;
	}

	function nextStatus() {
		setFetchingStatus(true);

		const nextStatus = getNextStatus(currentOrPendingStatus);
		setCurrentOrPendingStatus(nextStatus);

		if (fetchSubscription)
			fetchSubscription.unsubscribe();

		const extraWaitingTimeInMillis = 500;
		setFetchSubscription(
			// TODO implement
			of(nextStatus)
				.pipe(
					// Set user to wait a little before sending the request,
					// as the user might spam the status change thus reducing
					// server load.
					delay(extraWaitingTimeInMillis),
				)
				.subscribe(
					(value: TodoItemStatus) => {
						setFetchingStatus(false);
						props.statusChanged(value);
					},
					() => {
						// TODO handle
						setFetchingStatus(false);
						setCurrentOrPendingStatus(props.status);
					}
				)
		);
	}

	return (
		<div className="flex py-1 px-2 flex-row items-center">
			<ChangeTodoItemStatusButton status={props.status}
				nextStatus={nextStatus}
				currentOrPendingStatus={currentOrPendingStatus}
				fetchingStatus={fetchingStatus} />

			<SelectTodoItemStatusDropdownButton status={props.status}
				nextStatus={nextStatus}
				currentOrPendingStatus={currentOrPendingStatus}
				fetchingStatus={fetchingStatus}
			/>

			<div className="flex-1">
				<Formik
					initialValues={{ task: "" } as { task: string }}
					validate={(values: { task: string }) => validateFields(values)}
					onSubmit={(values: { task: string }) => {
						props.submitTaskText(values.task);
					}}>
					{({ isValid, dirty, handleReset }) => {
						setIsDirtyForm(dirty);
						return (
							<Form>
								<div style={{ minHeight: "4rem" }}
									className="flex flex-row items-center">
									<div className="flex-1">
										<TextAreaInput
											name="task"
											type="text"
											placeholder="" />
									</div>
									{dirty &&
										<div className="ml-1 w-14">
											<Button onClick={undefined}
												disabled={!isValid}
												type="submit"
												classNames={`
												whitespace-nowrap
												w-full px-2
												rounded-md bg-blue-50 bg-opacity-80
												border-blue-200
												text-blue-800
								${!isValid ? "opacity-50" : "hover:bg-blue-100 hover:bg-opacity-80"}
												m-0`}>
												Save
											</Button>
											<Button onClick={handleReset}
												disabled={!isValid}
												type="submit"
												classNames="text-xs
												whitespace-nowrap
												w-full px-2
												rounded-md bg-white bg-opacity-80
												hover:bg-gray-200 hover:bg-opacity-30
												text-gray-700
												m-0">
												Cancel
											</Button>
										</div>
									}
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
			{!isDirtyForm &&
				<div className="flex items-center justify-end ml-1 w-14">
					<IconButton onClick={props.onRemove}>
						<DeleteIcon />
					</IconButton>
				</div>
			}
		</div >
	);
}