import { Transition } from "@headlessui/react";
import React from "react";
import { Observable } from "rxjs";
import { IExistingTodoItem, TodoItemStatus } from "../../utils/HttpClient/Interfaces";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";

interface TodoListProps {
	todoItems: IExistingTodoItem[],
	deleteItem: (item: IExistingTodoItem) => Observable<unknown>,
	updateItemTask: (item: IExistingTodoItem, text: string) => Observable<unknown>,
	changeItemStatus: (item: IExistingTodoItem, newStatus: TodoItemStatus) => Observable<unknown>,
}

export default function TodoList(props: TodoListProps): JSX.Element {
	return (
		<div className="TodoList divide-y divide-black divide-opacity-20
			border-t border-b border-black border-opacity-20">
			{props.todoItems
				&& props.todoItems.length > 0
				&& props.todoItems
					.sort((a, b) => a.id - b.id)
					.map((todoItem) =>
						<Transition
							key={todoItem.id}
							show
							enter="ease-out duration-200"
							enterFrom="transform scale-y-0"
							enterTo="transform scale-y-100">
							<TodoItem
								todoItem={todoItem}
								delete={() => props.deleteItem(todoItem)}
								updateTask={
									(text: string) => props.updateItemTask(todoItem, text)
								}
								changeStatus={
									(newStatus: TodoItemStatus) => props.changeItemStatus(
										todoItem, newStatus
									)
								}
							/>
						</Transition>
					)}
		</div>
	);
}