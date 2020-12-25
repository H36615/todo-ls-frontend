import { useField } from "formik";
import React from "react";

interface TextAreaInputProps {
	name: string,
	type?: "text" | "email" | "password",
	placeholder?: string,
}

export default function TextAreaInput(props: TextAreaInputProps): JSX.Element {

	// Blame formik for this.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [field, meta] = useField(props as any);

	return (
		<div className="w-full">
			<textarea {...field}
				spellCheck="false"
				name={props.name}
				className={`resize-y h-12 w-300px text-sm font-semibold
				bg-gray-300 bg-opacity-10
				focus:outline-none focus:shadow-outline
				border-b rounded-sm
				px-1 block w-full
				appearance-none leading-normal
				text-gray-600 placeholder-gray-800
				${meta.touched && meta.error ? "border-red-500" : "border-gray-200"}
				`}
			/>

			{meta.touched && meta.error ? (
				<div className="error text-sm text-red-500">{meta.error}</div>
			) : <div />}
		</div>
	);
}