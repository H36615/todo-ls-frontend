import React, { useState } from "react";
import Button from "../../common/Button/Button";
import { IExistingTodoItem, TodoItemStatus } from "../../utils/HttpClient/Interfaces";
import TodoList from "./TodoList";

interface TodoListViewProps {
	signedIn: boolean,
}

export default function TodoListView(props: TodoListViewProps): JSX.Element {

	const [todoItems, setTodoItems] = useState<IExistingTodoItem[]>([
		{
			id: 1,
			user_id: 1,
			task: "task 1",
			status: TodoItemStatus.todo,
		},
		{
			id: 2,
			user_id: 2,
			task: "task 2",
			status: TodoItemStatus.inProgres,
		}
	]);

	function addItem() {
		setTodoItems(
			[
				...todoItems,
				// Placeholder. TODO implement.
				{
					id: todoItems[todoItems.length - 1].id + 1,
					user_id: 2,
					task: "task x",
					status: TodoItemStatus.done,
				}
			]
		);
	}

	function removeItem(itemId: number) {
		setTodoItems(
			todoItems
				.slice()
				.filter(item => item.id !== itemId)
		);
	}

	return (
		<div className="TodoListView">
			<div className="flex justify-end mr-5 mt-5">
				<Button onClick={() => { addItem(); }}>Add item</Button>
			</div>
			<div className="border-t border-b border-black border-opacity-20
				divide-y divide-black divide-opacity-20">
				{props.signedIn
					? <TodoList todoItems={todoItems} removeTodoItem={removeItem} />
					: <div className="text-center mt-5 mb-5">Sign in to start using todo-ls</div>
				}
			</div>
		</div>
	);
}