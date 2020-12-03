

import React from "react";
import { Transition } from "@headlessui/react";

export interface ModalProps {
	/** Open modal by setting this to true */
	children: React.ReactNode,
	modalOpen: boolean,
	onCloseModal: () => void,
	header: string,
	closeButtonText?: string,
}

export default function Modal(props: ModalProps): JSX.Element {
	return (
		<div>
			<Transition
				show={props.modalOpen}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">
				<div className={"fixed inset-0 overflow-y-auto"}>
					<div className="flex items-end justify-center min-h-screen pt-4 px-4
						pb-20 text-center block sm:pb-80">

						{/* Modal's background */}
						<div className="fixed inset-0 transition-opacity" aria-hidden="true">
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>

						{/* The modal panel */}
						<div role="dialog" aria-modal="true" aria-labelledby="modal-headline"
							className="inline-block align-bottom bg-white rounded-lg text-left
							overflow-hidden shadow-xl transform transition-all
							sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							{/* Modal "content" */}
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-left">
								<h3 id="modal-headline"
									className="text-lg leading-6 font-medium text-gray-900">
									{props.header}
								</h3>
								<div className="mt-2">
									{props.children}
								</div>
							</div>
							{/* Modal buttons */}
							<div className="bg-gray-100 px-4 py-3
								sm:px-6 sm:flex sm:flex-row-reverse">
								<button type="button" onClick={props.onCloseModal} className="
									justify-center w-full
									rounded-md border border-gray-300
									px-4 py-2 bg-white bg-opacity-80
									text-gray-700 hover:bg-gray-100
									focus:outline-none
									focus:ring-1 focus:ring-offset-0 focus:ring-gray-300
									mt-2 sm:mt-0 sm:ml-3 sm:w-auto">
									{props.closeButtonText || "Close"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	);
}
