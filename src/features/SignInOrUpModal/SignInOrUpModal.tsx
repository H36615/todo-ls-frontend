import React from "react";
import Modal from "../../common/Modal/Modal";
import "./SignInOrUpModal.css";
import SignIn from "./SignIn";

interface SignInOrUpModalProps {
	modalOpen: boolean,
	closeModal: () => void,
}

export default function SignInOrUpModal(props: SignInOrUpModalProps): JSX.Element {
	return (
		<div className="SignInOrUpModal">
			<Modal modalOpen={props.modalOpen} header="Sign in / Sign up"
				onCloseModal={props.closeModal}>

				<div>Sign in</div>

				<SignIn closeModal={props.closeModal} />
			</Modal>
		</div >
	);
}