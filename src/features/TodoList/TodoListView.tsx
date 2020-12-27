import React, { useEffect, useState } from "react";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import BasicButton from "../../common/BasicButton/BasicButton";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { ToastProps } from "../../common/Toast/Toast";
import { IExistingTodoItem, TodoItemStatus } from "../../utils/HttpClient/Interfaces";
import { TodoItemClient } from "../../utils/HttpClient/TodoItemClient";
import TodoList from "./TodoList";

interface TodoListViewProps {
	signedIn: boolean,
	toast: (toastProps: ToastProps) => void,
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
			}
		);
	}

	function changeItemStatus(itemId: number, newStatus: TodoItemStatus) {
		const tmpItems = todoItems.slice();
		const foundItem = tmpItems.find(item => item.id === itemId);
		if (foundItem)
			foundItem.status = newStatus;

		setTodoItems(
			tmpItems
		);
	}

	function updateItemTask(item: IExistingTodoItem, newTask: string): Observable<unknown> {
		return TodoItemClient.updateTodoItem({ ...item, task: newTask })
			.pipe(
				tap(() => {
					// -- Update state's todo item's task
					const tmpItems = todoItems.slice();
					const foundItem = tmpItems.find(tmpItem => tmpItem.id === item.id);
					if (foundItem)
						foundItem.task = newTask;
					setTodoItems(
						tmpItems
					);
				})
			);
	}

	function deleteItem(todoItem: IExistingTodoItem) {
		const item_: Pick<IExistingTodoItem, "id"> = { id: todoItem.id };
		return TodoItemClient.deleteTodoItem(item_)
			.pipe(
				tap(() => {
					// Update the state
					setTodoItems(
						_todoItems => {
							return _todoItems
								.slice()
								.filter(item => item.id !== todoItem.id);
						}
					);
				})
			);
	}

	return (
		<div className="TodoListView">
			<div className="flex justify-end mr-5 mt-5 mb-5 items-center">
				{(updatingItem || fetchingTodoItems) && <LoadingSpinner />}
				<BasicButton classNames={"ml-2"} onClick={addItem} disabled={
					updatingItem || fetchingTodoItems || !alreadySignedIn
				}>
					Add item
				</BasicButton>
			</div>
			{props.signedIn
				? <TodoList todoItems={todoItems} deleteItem={deleteItem}
					updateItemTask={updateItemTask} changeItemStatus={changeItemStatus} />
				: <div className="text-center pt-5 pb-5
					border-t border-b border-black border-opacity-20">
					Sign in to start using todo-ls
				</div>
			}
		</div>
	);
}