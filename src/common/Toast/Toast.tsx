

import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import InfoIcon from "../../icons/InfoIcon";
import SuccessIcon from "../../icons/SuccessIcon";
import WarningIcon from "../../icons/WarningIcon";
import ErrorIcon from "../../icons/ErrorIcon";

export interface ToastProps {
	text: string,
	type: "info" | "success" | "warn" | "error",
}

/** Simple toaster for simple needs. */
export default function Toast(props: ToastProps): JSX.Element {

	const [isToasting, setIsToasting] = useState<boolean>(false);

	function getIcon(): JSX.Element {
		if (props.type === "success")
			return <SuccessIcon />;
		if (props.type === "warn")
			return <WarningIcon />;
		if (props.type === "error")
			return <ErrorIcon />;
		return <InfoIcon />;
	}

	function getTypeStyles(): string {
		if (props.type === "success")
			return "bg-green-100 border-green-500";
		if (props.type === "warn")
			return "bg-yellow-100 border-yellow-500";
		if (props.type === "error")
			return "bg-red-100 border-red-500";
		return "bg-indigo-100 border-indigo-500";
	}

	useEffect(() => {
		// FIXME: Setting the props to the same current values from a parent component do not
		// effectively change the props value, so in those cases there will be no effect in
		// this toast (timer should start over).
		if (props.text && props.text.length > 0) {
			setIsToasting(true);

			const timeout = setTimeout(() => {
				setIsToasting(false);
			}, 5000);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [props.text]); // Text change detection should be enough.

	return (
		<div>
			<Transition
				show={isToasting}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">
				<div className="fixed pointer-events-none inset-0 overflow-y-auto">
					<div className="flex items-end justify-center pt-4 px-4
						text-center block">
						<div className={`items-center rounded-md
							border text-gray-700 bg-opacity-80
							px-3 py-1
							flex flex-row
							${getTypeStyles()}
							`}
						>
							{getIcon()}
							<div className="ml-2">
								{props.text}
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</div >
	);
}
