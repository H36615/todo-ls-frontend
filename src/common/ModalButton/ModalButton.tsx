import React from "react";
import BasicButton from "../BasicButton/BasicButton";

interface ModalButtonProps {
	press: () => void,
	children: React.ReactNode,
	disabled: boolean,
}

/** Like button, but with some fixed styling values & irrelevant parts excluded. */
export default function ModalButton(props: ModalButtonProps): JSX.Element {
	return (
		<BasicButton onClick={props.press}
			disabled={props.disabled}
			type="button"
			classNames="px-4 py-2">
			{props.children}
		</BasicButton>
	);
}