import React, { useState } from "react";
import BasicButton from "../../common/BasicButton/BasicButton";
import Toast, { ToastProps } from "../../common/Toast/Toast";
import { config } from "../../config/config";
import { IExistingUser } from "../../utils/HttpClient/Interfaces";
import { TodoItemClient } from "../../utils/HttpClient/TodoItemClient";
import SignInOrUpModal from "../SignInOrUpModal/SignInOrUpModal";
import TodoListView from "../TodoList/TodoListView";
import "./MainContent.css";

export default function MainContent(): JSX.Element {

	const [signInOrUpModalOpen, setSignInOrUpModalOpen] = useState<boolean>(false);
	const [toastProps, setToastProps] = useState<ToastProps>();
	const [userInfo, setUserInfo] = useState<IExistingUser | undefined>(undefined);

	/** @param toast toast optional toast on close. */
	function closeSignInOrUpModal(
		toast: ToastProps | undefined,
		signedInUser: IExistingUser | undefined
	): void {
		if (toast)
			setToastProps(toast);

		if (signedInUser)
			setUserInfo(signedInUser);

		setSignInOrUpModalOpen(false);
	}

	return (
		<div className="MainContent">
			<SignInOrUpModal modalOpen={signInOrUpModalOpen}
				closeModal={closeSignInOrUpModal} />

			<div className="flex flex-row w-full items-center">
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
				{userInfo
					? <div className="flex flex-row text-xl">
						<div className="text-gray-800">
							{userInfo.username}
						</div>
						<div className="text-gray-500">
							#{userInfo.tag}
						</div>
					</div>
					: <div style={{ margin: "10px 0" }}>
						<BasicButton onClick={() => setSignInOrUpModalOpen(true)}>
							Sign in / Sign up
						</BasicButton>
					</div>
				}
			</div>

			<div className="panel rounded-lg border-solid border border-black
				border-opacity-20">
				<TodoListView signedIn={userInfo !== undefined} />
			</div>

			<Toast text={toastProps?.text || ""} type={toastProps?.type || "info"}></Toast>
		</div>
	);
}