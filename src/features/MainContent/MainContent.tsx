import React, { useEffect, useState } from "react";
import BasicButton from "../../common/BasicButton/BasicButton";
import Button from "../../common/Button/Button";
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
		}

		setSignInOrUpModalOpen(false);
	}

	function signOut(): void {
		setSigningOut(true);
		UserClient.signOut()
			.subscribe(
				() => {
					setUserInfo(undefined);
					setSigningOut(false);
				},
				() => {
					// TODO Handle
					setSigningOut(false);
				}
			);
	}

	function toast(toastProps: ToastProps): void {
		if (toastProps)
			setToastProps(toastProps);
	}

	function userInfoView(): JSX.Element {
		if (userInfo === "unchecked")
			return <div className="text-sm text-gray-300 mr-4">loading</div>;

		if (userInfo !== undefined)
			return <div className="flex flex-row">
				<div className="text-gray-800 text-xl">
					{userInfo.username}
				</div>
				<div className="text-gray-500 text-xl">
					#{userInfo.tag}
				</div>
				<div className="ml-2 flex items-center">
					<Button
						disabled={signingOut}
						classNames={`
						border-gray-200
						bg-white
						rounded-md
						text-gray-500
						text-sm
						hover:bg-gray-100
						p-1
						`}
						onClick={signOut}>
						Sign out
					</Button>
				</div>
			</div>;

		return <BasicButton onClick={() => setSignInOrUpModalOpen(true)}>
			Sign in / Sign up
		</BasicButton>;
	}

	return (
		<div className="MainContent">
			<p className="mb-4 text-2xl font-bold text-gray-700">todo-ls</p>
			<SignInOrUpModal modalOpen={signInOrUpModalOpen}
				closeModal={closeSignInOrUpModal} />

			<div className="flex flex-row w-full items-center mb-2">
				<a href={config.sourceCodeUrl}
					className="items-center rounded-md
					px-3 py-1
					text-gray-700
					bg-gray-200 bg-opacity-50
					hover:bg-opacity-100
					focus:outline-none">
					<p className="bold">src git repository</p>
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