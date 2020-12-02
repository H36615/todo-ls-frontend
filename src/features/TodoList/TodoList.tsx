import React from "react";
import Button from "../../common/Button/Button";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";

export default function TodoList(): JSX.Element {

	const mockTodoItems = [
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
	];

	function addItem() {
		// TODO
		console.log("add item");
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
					<TodoItem key={todoItem.id} status={todoItem.status}>{todoItem.task}</TodoItem>
				)}
			</div>
		</div>
	);
}