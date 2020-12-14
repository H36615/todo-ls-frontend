import React, { useEffect, useState } from "react";
import Button from "../../common/Button/Button";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { IExistingTodoItem } from "../../utils/HttpClient/Interfaces";
import { TodoItemClient } from "../../utils/HttpClient/TodoItemClient";
import TodoList from "./TodoList";

interface TodoListViewProps {
	signedIn: boolean,
}

export default function TodoListView(props: TodoListViewProps): JSX.Element {

	const [fetchingTodoItems, setFetchingTodoItems] = useState<boolean>(false);
	const [todoItems, setTodoItems] = useState<IExistingTodoItem[]>([]);
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
		console.log("not implemented");
		// setTodoItems(
		// 	[
		// 		...todoItems,
		// 		// Placeholder. TODO implement.
		// 		{
		// 			id: todoItems[todoItems.length - 1].id + 1,
		// 			user_id: 2,
		// 			task: "task x",
		// 			status: TodoItemStatus.done,
		// 		}
		// 	]
		// );
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
				return <TodoList todoItems={todoItems} removeTodoItem={removeItem} />;
		}
		else
			return <div className="text-center mt-5 mb-5">Sign in to start using todo-ls</div>;
	}

	return (
		<div className="TodoListView">
			<div className="flex justify-end mr-5 mt-5">
				<Button onClick={() => { addItem(); }}>Add item</Button>
			</div>
			<div>
				{contentView()}
			</div>
		</div>
	);
}