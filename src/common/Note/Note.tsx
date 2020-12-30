import React from "react";
import InfoIcon from "../../icons/InfoIcon";
import WarningIcon from "../../icons/WarningIcon";

interface NoteProps {
	children: JSX.Element,
	/** Defaults to `info` */
	type?: "info" | "warn",
}

export default function Note(props: NoteProps): JSX.Element {

	function getStylingsByType() {
		if (props.type === "warn")
			return "bg-yellow-100 border-yellow-500";
		return "bg-blue-100 border-blue-500";
	}

	function getIconByType() {
		if (props.type === "warn")
			return < WarningIcon />;
		return <InfoIcon />;
	}

	return (
		<div className={`
		w-full h-full
		border
		rounded-md
		px-3 py-2
		${getStylingsByType()}
		`}>
			<div className="float-left mr-2">
				{getIconByType()}
			</div>
			<p>{props.children}</p>
		</div>
	);
}