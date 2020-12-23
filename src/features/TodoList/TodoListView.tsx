import React, { useEffect, useState } from "react";
import BasicButton from "../../common/BasicButton/BasicButton";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { IExistingTodoItem, TodoItemStatus } from "../../utils/HttpClient/Interfaces";
import { TodoItemClient } from "../../utils/HttpClient/TodoItemClient";
import TodoList from "./TodoList";

interface TodoListViewProps {
	signedIn: boolean,
}

export default function TodoListView(props: TodoListViewProps): JSX.Element {

	const [fetchingTodoItems, setFetchingTodoItems] = useState<boolean>(false);
	const [todoItems, setTodoItems] = useState<IExistingTodoItem[]>([]);
	const [updatingItem, setUpdatingItem] = useState<boolean>(false);
	/** Use state for signed in status too just to make sure data will not reload twice. */
	const [alreadySignedIn, setAlreadySignedIn] = useState<boolean>(false);

	useEffect(() => {
		if (props.signedIn === true && !alreadySignedIn) {
			setAlreadySignedIn(true);
			fetchTodoItems();
		}
	}, [props.signedIn]);

	function fetchTodoItems() {
		setFetchingTodoItems(true);
		TodoItemClient.getAllTodoItems().subscribe(
			todoItems => {
				setTodoItems(todoItems);
				setFetchingTodoItems(false);
			},
			() => {
				// TODO handle error
				setFetchingTodoItems(false);
			}
		);
	}

	function addItem() {
		setUpdatingItem(true);
		TodoItemClient.addTodoItem(
			{
				task: "NEW_TASK",
				status: TodoItemStatus.todo,
			}
		).subscribe(
			() => {
				fetchTodoItems();
				setUpdatingItem(false);
			},
			() => {
				// TODO Handle
				setUpdatingItem(false);
			}
		);
	}

	function updateItemTask(itemId: number, task: string) {
		console.log(itemId, task);
	}

	function updateItemStatus(itemId: number, newStatus: TodoItemStatus) {
		const tmpItems = todoItems.slice();
		const foundItem = tmpItems.find(item => item.id === itemId);
		if (foundItem)
			foundItem.status = newStatus;

		setTodoItems(
			tmpItems
		);
	}

	function removeItem(itemId: number) {
		setTodoItems(
			todoItems
				.slice()
				.filter(item => item.id !== itemId)
		);
	}

	function contentView(): JSX.Element {
		if (props.signedIn) {
			if (fetchingTodoItems)
				return <div className="flex justify-center m-4">
					<LoadingSpinner xySizeInPx={36} />
				</div>;
			else
				return <TodoList todoItems={todoItems} removeTodoItem={removeItem}
					submitTaskText={updateItemTask} statusChanged={updateItemStatus} />;
		}
		else
			return <div className="text-center pt-5 pb-5
				border-t border-b border-black border-opacity-20">
				Sign in to start using todo-ls
			</div>;
	}

	return (
		<div className="TodoListView">
			<div className="flex justify-end mr-5 mt-5 mb-5">
				<BasicButton onClick={() => { addItem(); }} disabled={
					updatingItem || fetchingTodoItems || !alreadySignedIn
				}>
					Add item
				</BasicButton>
			</div>
			<div>
				{contentView()}
			</div>
		</div>
	);
}