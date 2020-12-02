
import React from "react";
import Button from "../../../common/Button/Button";
import "./TodoItem.css";

export interface TodoItemProps {
	children: React.ReactNode,
	// TODO Use generated type.
	status: string,
}

export default function TodoItem(props: TodoItemProps): JSX.Element {

	function removeItem() {
		// TODO implement
		console.log("remove item");
	}

	return (
		<div className="TodoItem">
			<div style={{ width: 100 }}>
				<p>status</p>
				<p>{props.status}</p>
			</div>
			<div style={{ flex: 1, }}><p>{props.children}</p></div>
			<div style={{ display: "flex", alignItems: "center", }}>
				<Button onClick={() => { removeItem(); }}>Remove</Button>
			</div>
		</div >
	);
}