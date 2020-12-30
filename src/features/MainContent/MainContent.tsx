import React, { useEffect, useState } from "react";
import BasicButton from "../../common/BasicButton/BasicButton";
import Toast, { ToastProps } from "../../common/Toast/Toast";
import { config } from "../../config/config";
import { IExistingUser } from "../../utils/HttpClient/Interfaces";
import { UserClient } from "../../utils/HttpClient/UserClient";
import SignInOrUpModal from "../SignInOrUpModal/SignInOrUpModal";
import TodoListView from "../TodoList/TodoListView";
import "./MainContent.css";

export default function MainContent(): JSX.Element {

	const [signInOrUpModalOpen, setSignInOrUpModalOpen] = useState<boolean>(false);
	const [toastProps, setToastProps] = useState<ToastProps>();
	const [userInfo, setUserInfo] = useState<
		Pick<IExistingUser, "username" | "tag" | "id">
		| "unchecked"
		| undefined // i.e. not signed in
	>("unchecked");
	const [signingOut, setSigningOut] = useState<boolean>(false);

	useEffect(() => {
		if (userInfo === "unchecked")
			setSessionStatus();
	}, []);

	function setSessionStatus(): void {
		UserClient.sessionIsValid().subscribe(
			ajaxRes => {
				setUserInfo(ajaxRes.response as Pick<IExistingUser, "username" | "tag" | "id">);
			},
			() => {
				// TODO
				// if status 401 (unauthorized) handle properly
				// TODO Handle?
				setUserInfo(undefined);
			}
		);
	}

	/** @param toastProps toast optional toast on close. */
	function closeSignInOrUpModal(
		toastProps: ToastProps | undefined,
		signedInUser: IExistingUser | undefined
	): void {
		if (toastProps)
			toast(toastProps);

		if (signedInUser) {
			setUserInfo(signedInUser);
			setSessionValidityChecked(true);
		}

		setSignInOrUpModalOpen(false);
	}

	function toast(toastProps: ToastProps): void {
		if (toastProps)
			setToastProps(toastProps);
	}

	function userInfoView(): JSX.Element {
		if (userInfo === "unchecked")
			return <div className="text-sm text-gray-300 mr-4">loading</div>;

		if (userInfo !== undefined)
			return <div className="flex flex-row text-xl">
				<div className="text-gray-800">
					{userInfo.username}
				</div>
				<div className="text-gray-500">
					#{userInfo.tag}
				</div>
			</div>;

		return <div style={{ margin: "10px 0" }}>
			<BasicButton onClick={() => setSignInOrUpModalOpen(true)}>
				Sign in / Sign up
			</BasicButton>
		</div>;
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
				{userInfoView()}
			</div>

			<div className="panel rounded-lg border-solid border border-black
				border-opacity-20">
				<TodoListView
					signedIn={userInfo !== "unchecked" && userInfo !== undefined}
					toast={toast} />
			</div>

			<Toast text={toastProps?.text || ""} type={toastProps?.type || "info"}></Toast>
		</div>
	);
}