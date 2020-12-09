import { useField } from "formik";
import React from "react";

interface InputProps {
	label: string,
	name: string,
	type?: "text" | "email" | "password",
	placeholder?: string,
}

export default function Input(props: InputProps): JSX.Element {

	// Blame formik for this.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [field, meta] = useField(props as any);

	return (
		<>
			<label htmlFor={props.name}
				className="block text-sm font-medium text-gray-700">
				{props.label}
			</label>

			<input {...field}
				name={props.name}
				type={props.type || "text"}
				placeholder={props.placeholder || ""}
				className={`bg-white focus:outline-none focus:shadow-outline
				border rounded-lg
				py-1 px-2 block w-full
				appearance-none leading-normal
				text-gray-800 placeholder-gray-800
				${meta.touched && meta.error ? "border-red-500" : "border-gray-300"}`}
			/>

			{meta.touched && meta.error ? (
				<div className="error text-sm text-red-500">{meta.error}</div>
			) : <div className="text-sm">&nbsp;</div>}
		</>
	);
}