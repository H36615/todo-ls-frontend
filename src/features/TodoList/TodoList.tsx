import React from "react";
import { IExistingTodoItem, TodoItemStatus } from "../../utils/HttpClient/Interfaces";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";

interface TodoListProps {
	todoItems: IExistingTodoItem[],
	removeTodoItem: (itemId: number) => void,
	submitTaskText: (id: number, text: string) => void,
	statusChanged: (itemId: number, newStatus: TodoItemStatus) => void,
}

export default function TodoList(props: TodoListProps): JSX.Element {
	return (
		<div className="TodoList divide-y divide-black divide-opacity-20
			border-t border-b border-black border-opacity-20">
			{props.todoItems && props.todoItems.length > 0 && props.todoItems.map((todoItem) =>
				<TodoItem key={todoItem.id} status={todoItem.status}
					onRemove={() => props.removeTodoItem(todoItem.id)}
					taskText={todoItem.task}
					id={todoItem.id}
					submitTaskText={(text: string) => props.submitTaskText(todoItem.id, text)}
					statusChanged={
						(newStatus: TodoItemStatus) => props.statusChanged(todoItem.id, newStatus)
					}
				/>
			)}
		</div>
	);
}