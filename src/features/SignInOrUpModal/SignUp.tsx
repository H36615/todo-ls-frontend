import React from "react";
import { Formik, Form } from "formik";
import Input from "../../common/Input/Input";
import BasicButton from "../../common/BasicButton/BasicButton";
import { UserClient } from "../../utils/HttpClient/UserClient";
import { Observable } from "rxjs";
import { ToastProps } from "../../common/Toast/Toast";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

interface SignUpProps {
	closeModal: (toast: ToastProps) => void,
	setModalButtonsDisabled: (disabled: boolean) => void,
	toast: (toast: ToastProps) => void,
}

export default function SignUp(props: SignUpProps): JSX.Element {

	interface FormFields {
		username: string,
		email: string,
		password: string,
	}

	/** Create errors object if validation fails. */
	function validateFields(fields: FormFields) {
		let errors = {};

		if (!fields.username)
			errors = { ...errors, username: "Required" };
		else if (/[^A-Za-z0-9_.]/.test(fields.username))
			errors = { ...errors, username: "Only a-z, A-Z and 0-9 allowed" };
		else if (fields.username.length > 32)
			errors = { ...errors, username: "Password must be less than 32 characters long" };

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

	function submitForm(values: FormFields): Observable<unknown> {
		props.setModalButtonsDisabled(true);
		return UserClient.signUp(
			{
				username: values.username,
				email: values.email,
				password: values.password
			}
		);
	}

	return (
		<Formik
			initialValues={{ email: "", password: "", username: "" } as FormFields}
			validate={(values: FormFields) => validateFields(values)}
			onSubmit={(values: FormFields, { setSubmitting }) => {
				submitForm(values)
					.subscribe(
						() => {
							props.closeModal({
								text: "Sign up success! You can now sign in",
								type: "success"
							});
							setSubmitting(false);
							props.setModalButtonsDisabled(false);
						},
						() => {
							// TODO Give errors based on response code
							props.toast({ text: "Error", type: "warn" });
							setSubmitting(false);
							props.setModalButtonsDisabled(false);
						}
					);
			}}>
			{({ isSubmitting, isValid }) => (
				<Form>
					<Input label="Username"
						name="username"
						type="text"
						placeholder="" />

					<Input label="Email Address"
						name="email"
						type="email"
						placeholder="" />

					<Input label="Password"
						type="password"
						name="password" />

					<div className="flex flex-row items-center">
						<BasicButton onClick={undefined}
							disabled={isSubmitting || !isValid}
							type="submit">
							Sign up
						</BasicButton>
						{isSubmitting &&
							<div className="ml-4">
								<LoadingSpinner />
							</div>
						}
					</div>
				</Form>
			)}
		</Formik>
	);
}