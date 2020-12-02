
import React from "react";
import "./TodoItem.css";

export interface TodoItemProps  { 
	children: React.ReactNode
}

export default function TodoItem(props: TodoItemProps): JSX.Element {
	return (
		<div className="TodoItem">
			{props.children}
		</div>
	);
}