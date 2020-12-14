import React from "react";
import { IExistingTodoItem } from "../../utils/HttpClient/Interfaces";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";

interface TodoListProps {
	todoItems: IExistingTodoItem[],
	removeTodoItem: (itemId: number) => void,
}

export default function TodoList(props: TodoListProps): JSX.Element {
	return (
		<div className="TodoList">
			{props.todoItems && props.todoItems.length > 0 && props.todoItems.map((todoItem) =>
				<TodoItem key={todoItem.id} status={todoItem.status}
					onRemove={() => props.removeTodoItem(todoItem.id)}>
					{todoItem.task}
				</TodoItem>
			)}
		</div>
	);
}