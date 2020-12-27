
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Observable, of, Subscription } from "rxjs";
import { concatMap, delay, take } from "rxjs/operators";
import IconButton from "../../../common/IconButton/IconButton";
import TextAreaInput from "../../../common/TextAreaInput/TextAreaInput";
import DeleteIcon from "../../../icons/DeleteIcon";
import { IExistingTodoItem, TodoItemStatus } from "../../../utils/HttpClient/Interfaces";
import { TodoItemClient } from "../../../utils/HttpClient/TodoItemClient";
import ChangeTodoItemStatusButton from "./ChangeTodoItemStatusButton";
import SelectTodoItemStatusDropdownButton from "./SelectTodoItemStatusDropdownButton";
import TaskActionButtons from "./TaskActionButtons";

export interface TodoItemProps {
	todoItem: IExistingTodoItem,
	changeStatus: (newStatus: TodoItemStatus) => void,
	delete: () => Observable<unknown>,
	updateTask: (text: string) => Observable<unknown>,
}

export default function TodoItem(props: TodoItemProps): JSX.Element {

	const [currentOrPendingStatus, setCurrentOrPendingStatus]
		= useState<TodoItemStatus>(props.todoItem.status);
	const [isDirtyForm, setIsDirtyForm] = useState<boolean>(false);
	const [fetchingStatus, setFetchingStatus] = useState<boolean>(false);
	const [fetchSubscription, setFetchSubscription] = useState<Subscription>();
	const [updatingTask, setUpdatingTask] = useState<boolean>(false);
	const [deletingItself, setDeletingItself] = useState<boolean>(false);

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

	function updateStatus(newStatus: TodoItemStatus) {
		if (currentOrPendingStatus === newStatus)
			return;

		setFetchingStatus(true);
		setCurrentOrPendingStatus(newStatus);

		if (fetchSubscription)
			fetchSubscription.unsubscribe();

		const extraWaitingTimeInMillis = 500;
		const newTodoItem = { ...props.todoItem, status: newStatus };

		setFetchSubscription(
			of(true)
				.pipe(
					// Set user to wait a little before sending the request
					// as the user might spam the status change, causing
					// server load.
					delay(extraWaitingTimeInMillis),
					concatMap(() => TodoItemClient.updateTodoItem(newTodoItem)),
					take(1),
				)
				.subscribe(
					() => {
						setFetchingStatus(false);
						props.changeStatus(newStatus);
					},
					() => {
						// TODO handle
						setFetchingStatus(false);
						setCurrentOrPendingStatus(props.todoItem.status);
					}
				)
		);
	}

	function nextStatus() {
		updateStatus(
			getNextStatus(currentOrPendingStatus)
		);
	}

	function deleteItem() {
		if (!deletingItself) {
			setDeletingItself(true);
			props.delete()
				.subscribe(
					() => {
						setDeletingItself(false);
						props.delete();
					},
					() => {
						// TODO handle error
						setDeletingItself(false);
					}
				);
		}
	}

	function updateTask(newTask: string) {
		setUpdatingTask(true);
		props.updateTask(newTask)
			.subscribe(
				() => {
					setUpdatingTask(false);
				},
				() => {
					setUpdatingTask(false);
					// TODO handle
				},
			);
	}

	const minHeight = "4rem";
	return (
		<div className="flex py-1 px-2 flex-row items-top">
			<div>
				<div style={{ minHeight: minHeight }} className="flex flex-row items-center">
					<ChangeTodoItemStatusButton status={props.todoItem.status}
						nextStatus={nextStatus}
						currentOrPendingStatus={currentOrPendingStatus}
						fetchingStatus={fetchingStatus}
						disabled={deletingItself}
					/>

					<SelectTodoItemStatusDropdownButton status={props.todoItem.status}
						changeStatus={updateStatus}
						currentOrPendingStatus={currentOrPendingStatus}
						fetchingStatus={fetchingStatus}
						disabled={deletingItself}
					/>
				</div>
			</div>

			<div className="flex-1">
				<Formik
					initialValues={{ task: props.todoItem.task } as { task: string }}
					validate={(values: { task: string }) => validateFields(values)}
					enableReinitialize
					onSubmit={(values: { task: string }) => {
						updateTask(values.task);
					}}>
					{({ isValid, dirty, handleReset }) => {
						setIsDirtyForm(dirty);
						return (
							<Form>
								<div style={{ minHeight: minHeight }}
									className="flex flex-row items-center">
									<div className="flex-1">
										<TextAreaInput
											name="task"
											type="text"
											placeholder="" />
									</div>
									{dirty &&
										<TaskActionButtons
											disabled={!isValid || updatingTask || deletingItself}
											cancelPressed={handleReset} />
									}
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
			{!isDirtyForm &&
				<div className="flex items-center justify-end ml-1 w-14">
					<IconButton onClick={deleteItem}>
						<DeleteIcon />
					</IconButton>
				</div>
			}
		</div >
	);
}