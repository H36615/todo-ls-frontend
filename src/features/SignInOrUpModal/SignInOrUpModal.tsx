import React from "react";
import Modal from "../../common/Modal/Modal";
import "./SignInOrUpModal.css";
import { Formik, Form } from "formik";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

interface LoginModalProps {
	modalOpen: boolean,
	onCloseModal: () => void,
}

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

export default function SignInOrUpModal(props: LoginModalProps): JSX.Element {
	return (
		<div className="SignInOrUpModal">
			<Modal modalOpen={props.modalOpen} header="Sign in / Sign up"
				onCloseModal={props.onCloseModal}>

				<div>Sign in</div>

				<Formik
					initialValues={{ email: "", password: "" } as FormFields}
					validate={(values: FormFields) => validateFields(values)}
					onSubmit={(values: FormFields, { setSubmitting }) => {
						setTimeout(() => {
							console.log("submitting with ", values);
							setSubmitting(false);
						}, 1000);
					}}>
					{({ isSubmitting, isValid }) => (
						<Form>
							<Input label="Email Address"
								name="email"
								type="email"
								placeholder="" />

							<Input label="Password"
								name="password" />

							<Button onClick={undefined}
								disabled={isSubmitting || !isValid}
								type="submit">
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</Modal>
		</div >
	);
}