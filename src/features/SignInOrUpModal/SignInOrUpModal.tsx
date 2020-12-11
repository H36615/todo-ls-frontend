import React, { useState } from "react";
import Modal from "../../common/Modal/Modal";
import "./SignInOrUpModal.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Toast, { ToastProps } from "../../common/Toast/Toast";

interface SignInOrUpModalProps {
	modalOpen: boolean,
	closeModal: (toast: ToastProps | undefined) => void,
}

export default function SignInOrUpModal(props: SignInOrUpModalProps): JSX.Element {

	const [modalButtonsDisabled, setModalButtonsDisabled] = useState<boolean>(false);
	/** Sign in enabled, otherwise sign up is enabled. */
	const [signInEnabled, setSignInEnabled] = useState<boolean>(false);
	const [toastProps, setToastProps] = useState<ToastProps | undefined>();

	function toast(toast: ToastProps): void {
		setToastProps(undefined); // Reset first to be able to toast with same values again.
		setToastProps(toast);
	}

	function closeModal(toast: ToastProps | undefined): void {
		// Little hack to prevent toasting in some cases when reopening this modal
		setToastProps(undefined);
		props.closeModal(toast);
	}

	return (
		<div className="SignInOrUpModal">
			<Modal modalOpen={props.modalOpen} header="Sign in / Sign up"
				onCloseModal={() => closeModal(undefined)}
				closeButtonDisabled={modalButtonsDisabled}>

				{/* Tab buttons */}
				<div className="flex flex-row items-end mb-6 mt-4">
					<button
						className={`items-center rounded-t-md
						text-gray-700 bg-white bg-opacity-80
						px-3 py-1 border flex-1
						border-gray-300
						focus:outline-none
			${signInEnabled ?
			"opacity-50 border-b-0" :
			"hover:bg-gray-300 hover:bg-opacity-30 bg-gray-100 shadow-inline_bottom"}
						`}
						onClick={() => setSignInEnabled(true)}>
						<p className="bold">Sign in</p>
					</button>
					<div className="h-1 w-1 border-b shadow-inline_bottom" />
					<button
						className={`items-center rounded-t-md
						text-gray-700 bg-white bg-opacity-80
						px-3 py-1 border flex-1
						border-gray-300
						focus:outline-none
			${signInEnabled ?
			"hover:bg-gray-200 hover:bg-opacity-30 bg-gray-100 shadow-inline_bottom" :
			"opacity-50 border-b-0"}
						`}
						onClick={() => setSignInEnabled(false)}>
						<p className="bold">Sign up</p>
					</button>
				</div>
				{signInEnabled
					? <>
						<SignIn
							closeModal={(toast: ToastProps) => closeModal(toast)}
							setModalButtonsDisabled={
								(disabled: boolean) => setModalButtonsDisabled(disabled)
							}
							toast={toast} />
					</>
					: <>
						<SignUp closeModal={(toast: ToastProps) => closeModal(toast)}
							setModalButtonsDisabled={
								(disabled: boolean) => setModalButtonsDisabled(disabled)
							}
							toast={toast}/>
					</>
				}
				{toastProps 
					? <Toast text={toastProps?.text || ""} type={toastProps?.type || "info"} />
					: null
				}
			</Modal>
		</div >
	);
}