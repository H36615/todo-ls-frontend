
import React from "react";
import Button from "../../../common/Button/Button";
import "./TodoItem.css";

export interface TodoItemProps {
	children: React.ReactNode,
	// TODO Use generated type.
	status: string,
	onRemove: () => void,
}

export default function TodoItem(props: TodoItemProps): JSX.Element {
	return (
		<div className="TodoItem">
			<div style={{ width: 100 }}>
				<p>status</p>
				<p>{props.status}</p>
			</div>
			<div style={{ flex: 1, }}><p>{props.children}</p></div>
			<div style={{ display: "flex", alignItems: "center", }}>
				<Button onClick={props.onRemove}>Remove</Button>
			</div>
		</div >
	);
}