import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../common/Button/Button";
import Toast, { ToastProps } from "../../common/Toast/Toast";
import { config } from "../../config/config";
import { RootState } from "../../store/store";
import SignInOrUpModal from "../SignInOrUpModal/SignInOrUpModal";
import TodoList from "../TodoList/TodoList";
import "./MainContent.css";

export default function MainContent(): JSX.Element {

	const [signInOrUpModalOpen, setSignInOrUpModalOpen] = useState<boolean>(false);
	const [toastProps, setToastProps] = useState<ToastProps>();

	/** @param toast toast optional toast on close. */
	function closeSignInOrUpModal(toast?: ToastProps | undefined): void {
		if (toast)
			setToastProps(toast);

		setSignInOrUpModalOpen(false);
	}

	const userSelector = useSelector(
		(state: RootState) => {
			return state.user;
		}
	);

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
				{userSelector.signedIn
					? <div className="flex flex-row">
						<div>
							{userSelector.user?.username}
						</div>
						<div className="text-gray-500">
							#{userSelector.user?.tag}
						</div>
					</div>
					: <div style={{ margin: "10px 0" }}>
						<Button onClick={() => setSignInOrUpModalOpen(true)}>
							Sign in / Sign up
						</Button>
					</div>
				}
			</div>

			<div className="panel rounded-lg border-solid border border-black
				border-opacity-20">
				<TodoList />
			</div>

			<Toast text={toastProps?.text || ""} type={toastProps?.type || "info"}></Toast>
		</div>
	);
}