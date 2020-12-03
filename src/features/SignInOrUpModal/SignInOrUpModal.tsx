import React from "react";
import Modal from "../../common/Modal/Modal";
import "./SignInOrUpModal.css";

interface LoginModalProps {
	modalOpen: boolean,
	onCloseModal: () => void,
}

export default function SignInOrUpModal(props: LoginModalProps): JSX.Element {
	return (
		<div className="LoginModal">
			<Modal modalOpen={props.modalOpen} header="Sign in / Sign up"
				onCloseModal={props.onCloseModal}>
				<div>sign in/up content</div>
			</Modal>
		</div>
	);
}