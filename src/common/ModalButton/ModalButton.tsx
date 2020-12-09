import React from "react";
import Button from "../Button/Button";

interface ModalButtonProps {
	press: () => void,
	children: React.ReactNode,
	disabled: boolean,
}

/** Like button, but with some fixed styling values & irrelevant parts excluded. */
export default function ModalButton(props: ModalButtonProps): JSX.Element {
	return (
		<Button onClick={props.press}
			disabled={props.disabled}
			type="button"
			classNames="px-4 py-2">
			{props.children}
		</Button>
	);
}