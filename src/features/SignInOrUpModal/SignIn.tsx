import React from "react";
import { Formik, Form } from "formik";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { UserClient } from "../../utils/HttpClient/UserClient";

interface LoginProps {
	closeModal: () => void,
	setModalButtonsDisabled: (disabled: boolean) => void,
}

export default function SignIn(props: LoginProps): JSX.Element {

	interface FormFields {
		email: string,
		password: string,
	}
	
	/** Create errors object if validation fails. */
	function validateFields(fields: FormFields) {
		let errors = {};
		if (!fields.email)
			errors = { ...errors, email: "Required" };
		else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields.email))
			errors = { ...errors, email: "Invalid email address" };
	
		if (!fields.password)
			errors = { ...errors, password: "Required" };
		else if (fields.password.length < 6)
			errors = { ...errors, password: "Password must be at least 6 characters long" };
		else if (fields.password.length > 512)
			errors = { ...errors, password: "Password must be less than 512 characters long" };
	
		return errors;
	}
	
	function submitForm(values: FormFields) {
		props.setModalButtonsDisabled(true);
		return UserClient.signIn(values.email, values.password);
	}

	return (
		<Formik
			initialValues={{ email: "", password: "" } as FormFields}
			validate={(values: FormFields) => validateFields(values)}
			onSubmit={(values: FormFields, { setSubmitting }) => {
				submitForm(values)
					.subscribe(
						value => {
							// TODO Handle
							props.closeModal();
							setSubmitting(false);
							props.setModalButtonsDisabled(false);
						},
						error => {
							// TODO Handle
							setSubmitting(false);
							props.setModalButtonsDisabled(false);
						}
					);
			}}>
			{({ isSubmitting, isValid }) => (
				<Form>
					<Input label="Email Address"
						name="email"
						type="email"
						placeholder="" />

					<Input label="Password"
						type="password"
						name="password" />

					<Button onClick={undefined}
						disabled={isSubmitting || !isValid}
						type="submit">
						Sign in
					</Button>
				</Form>
			)}
		</Formik>
	);
}