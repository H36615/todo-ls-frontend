// This component is necessarily a bit hacky so have to use this.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";

interface IOptionKeyValuePair<T> {
	option: string,
	value: T,
}

interface DropdownProps<T> {
	dropdownOptions: Array<IOptionKeyValuePair<T>>,
	selectionChange: (option: T) => void,
	buttonText: string,
	buttonClassesNames?: string,
	initialValue?: IOptionKeyValuePair<T>,
	disabled?: boolean,
}

export default function Dropdown<T>(props: DropdownProps<T>): JSX.Element {

	const thisRef: any = useRef();
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const [selection, setSelection]
		= useState<T | undefined>(props.initialValue?.value || undefined);

	/** Open/close dropdown */
	function switchDropdown() {
		setDropdownOpen(!dropdownOpen);
	}

	function collapseDropdown() {
		setDropdownOpen(false);
	}

	function selectOption(option: IOptionKeyValuePair<T>) {
		setSelection(option.value);
		props.selectionChange(option.value);
		collapseDropdown();
	}

	function pressOutside(event: any) {
		if (!((thisRef.current as any).contains(event.target))) {
			collapseDropdown();
		}
	}

	/** @param option is the current selection */
	function currentSelection(option: IOptionKeyValuePair<T>) {
		return (option.value === selection);
	}

	useEffect(() => {
		document.addEventListener("mousedown", pressOutside);
		return () => document.removeEventListener("mousedown", pressOutside);
	});

	return (
		<div className="relative inline-block text-left" ref={thisRef}>
			<button
				disabled={props.disabled}
				type="button" className={`${props.buttonClassesNames}`}
				onClick={switchDropdown}>
				{props.buttonText}
			</button>
			<Transition show={dropdownOpen}>
				<div
					className="
					absolute z-30
					left-0
					rounded-md
					bg-white
					ring-1 ring-black ring-opacity-5"
					style={{ minWidth: "5rem" }}>
					<div className="py-1">
						{props.dropdownOptions && props.dropdownOptions.map((option, index) =>
							<Button
								classNames={`
								whitespace-nowrap
								w-full
								text-left
								py-1 px-2 text-sm text-gray-700
								hover:bg-gray-200 hover:text-gray-900
								border-none
								${currentSelection(option) && "bg-gray-100"}
								`}
								key={index}
								onClick={() => { selectOption(option); }}>
								{option.option}
							</Button>
						)}
					</div>
				</div>
			</Transition>
		</div >
	);
}


