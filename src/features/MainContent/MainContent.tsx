import React, { useState } from "react";
import Button from "../../common/Button/Button";
import { config } from "../../config/config";
import SignInOrUpModal from "../SignInOrUpModal/SignInOrUpModal";
import TodoList from "../TodoList/TodoList";
import "./MainContent.css";

export default function MainContent(): JSX.Element {

	const [signInOrUpModalOpen, setSignInOrUpModalOpen] = useState<boolean>(false);

	return (
		<div className="MainContent">
			<SignInOrUpModal modalOpen={signInOrUpModalOpen}
				closeModal={(() => setSignInOrUpModalOpen(false))} />

			<div style={{ flexDirection: "row", display: "flex", width: "100%" }}>
				<a href={config.sourceCodeUrl}
					className="items-center rounded-md
					border px-3 py-1
					text-gray-700 bg-white bg-opacity-80
					hover:bg-gray-200 hover:bg-opacity-30
					focus:outline-none"
					style={{ minWidth: "10px", margin: "10px 0" }}>
					<p className="bold">Check out the src code</p>
				</a>
				<div style={{ flex: 1 }}></div>
				<div style={{ margin: "10px 0" }}>
					<Button onClick={() => setSignInOrUpModalOpen(true)}>Sign in / Sign up</Button>
				</div>
			</div>

			<div className="panel rounded-lg border-solid border border-black
				border-opacity-20">
				<TodoList />
			</div>
		</div>
	);
}