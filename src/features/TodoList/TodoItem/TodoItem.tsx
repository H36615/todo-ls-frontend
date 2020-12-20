
import { Form, Formik } from "formik";
import React from "react";
import Button from "../../../common/Button/Button";
import IconButton from "../../../common/IconButton/IconButton";
import TextAreaInput from "../../../common/TextAreaInput/TextAreaInput";
import DeleteIcon from "../../../icons/DeleteIcon";
import { TodoItemStatus } from "../../../utils/HttpClient/Interfaces";
import ChangeTodoItemStatusButton from "./ChangeTodoItemStatusButton";

export interface TodoItemProps {
	id: number,
	taskText: string,
	status: TodoItemStatus,
	onRemove: () => void,
	submitTaskText: (text: string) => void,
}

export default function TodoItem(props: TodoItemProps): JSX.Element {

	function validateFields(fields: { task: string }) {
		let errors = {};
		if (!fields.task || fields.task.length < 1)
			errors = { ...errors, task: "Required" };
		else if (fields.task.length > 100)
			errors = { ...errors, task: "Task must be less than 100 characters" };

		return errors;
	}

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

	return (
		<div className="flex py-1 px-2 flex-row items-center">
			<ChangeTodoItemStatusButton />
			<p className="w-20 ml-2 mr-1">{getStatusText(props.status)}</p>
			<div className="flex-1">
				<Formik
					initialValues={{ task: "" } as { task: string }}
					validate={(values: { task: string }) => validateFields(values)}
					onSubmit={(values: { task: string }) => {
						props.submitTaskText(values.task);
					}}>
					{({ isValid }) => (
						<Form>
							<div className="flex flex-row items-center">
								<TextAreaInput
									name="task"
									type="text"
									placeholder="" />

								<div className="mx-1">
									<Button onClick={undefined}
										disabled={!isValid}
										type="submit"
										classNames="
										whitespace-nowrap
										w-full px-2
										rounded-md bg-blue-100 bg-opacity-80
										hover:bg-blue-200 hover:bg-opacity-80
										border-blue-200 text-blue-800">
										Save
									</Button>
									<Button onClick={undefined}
										disabled={!isValid}
										type="submit"
										classNames="text-xs
										whitespace-nowrap
										w-full px-2
										rounded-md bg-white bg-opacity-80
										hover:bg-gray-200 hover:bg-opacity-30
										">
										Cancel
									</Button>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>

			<div className="flex items-center">
				<IconButton onClick={props.onRemove}>
					<DeleteIcon />
				</IconButton>
			</div>
		</div >
	);
}