import React, { useState } from "react";
import Button from "../../common/Button/Button";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";

export default function TodoList(): JSX.Element {

	/** Placeholder. TODO use generated when possible. */
	interface PlaceholderTodoItem {
		id: number,
		task: string,
		status: string,
	}
	const [mockTodoItems, setMockTodoItems] = useState<PlaceholderTodoItem[]>(
		[
			{
				id: 1,
				task: "mock task 1",
				status: "todo",
			},
			{
				id: 2,
				task: "mock task 2",
				status: "in progress",
			},
			{
				id: 3,
				task: "mock task 3",
				status: "done",
			},
		]
	);
	// Placeholder. TODO remove after using real ids.
	const [nextId, setNextId] = useState<number>(4);

	function addItem() {
		setMockTodoItems(
			[
				...mockTodoItems,
				{
					id: nextId,
					task: "mock task x",
					status: "todo",
				}
			]
		);
		// TODO Remove.
		setNextId(nextId + 1);
	}

	function removeItem(itemId: number) {
		setMockTodoItems(
			mockTodoItems
				.slice()
				.filter(item => item.id !== itemId)
		);
	}

	return (
		<div className="TodoList">
			<div className="add-item-button-div">
				<Button onClick={() => { addItem(); }}>Add item</Button>
			</div>

			<div className="border-t border-b border-black border-opacity-20
				divide-y divide-black divide-opacity-20">

				{/* TODO type 'todoItem' when possible */}
				{mockTodoItems.map((todoItem) =>
					<TodoItem key={todoItem.id} status={todoItem.status}
						onRemove={() => removeItem(todoItem.id)}>
						{todoItem.task}
					</TodoItem>
				)}
			</div>
		</div>
	);
}