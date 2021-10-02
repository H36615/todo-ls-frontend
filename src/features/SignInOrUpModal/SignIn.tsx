import React, { useState } from "react";
import { Formik, Form } from "formik";
import Input from "../../common/Input/Input";
import BasicButton from "../../common/BasicButton/BasicButton";
import { UserClient } from "../../utils/HttpClient/UserClient";
import { ToastProps } from "../../common/Toast/Toast";
import { IExistingUser } from "../../utils/HttpClient/Interfaces";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import FillTestUserInfoNote from "./FillTestUserInfoNote";
import { EnvironmentUtils } from "../../utils/environment/Environment";

interface LoginProps {
	closeModal: (toast: ToastProps, signInUserInfo: IExistingUser) => void,
	setModalButtonsDisabled: (disabled: boolean) => void,
	toast: (toast: ToastProps) => void,
}

export default function SignIn(props: LoginProps): JSX.Element {

	const [showWarning, setShowWarning] = useState<boolean>(false);

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

	function agreeOnTestUserInfoFill(formFields: FormFields) {
		if (!showWarning)
			setShowWarning(true);
		else {
			fillInTestUserInfo(formFields);
			setShowWarning(false);
		}
	}

	function fillInTestUserInfo(formFields: FormFields) {
		formFields.email = EnvironmentUtils.getTestPublicUserEmail();
		formFields.password = EnvironmentUtils.getTestPublicUserPassword();
	}

	return (
		<Formik
			initialValues={{ email: "", password: "" } as FormFields}
			validate={(values: FormFields) => validateFields(values)}
			onSubmit={(values: FormFields, { setSubmitting }) => {
				submitForm(values)
					.subscribe(
						ajaxResponse => {
							props.closeModal(
								{ text: "Login success!", type: "success" },
								ajaxResponse.response as IExistingUser,
							);
							setSubmitting(false);
							props.setModalButtonsDisabled(false);
						},
						() => {
							props.toast({ text: "Error", type: "warn" });
							setSubmitting(false);
							props.setModalButtonsDisabled(false);
						}
					);
			}}>
			{({ isSubmitting, isValid, values, setFieldTouched }) => (
				<Form>
					<div className="mb-2">
						<FillTestUserInfoNote
							showWarning={showWarning}
							agreeOnTestUserInfoFill={
								() => {
									agreeOnTestUserInfoFill(values);
									// Touch any field to update the form.
									setFieldTouched("email");
								}
							} />
					</div>
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
							Sign in
						</BasicButton>
						{isSubmitting &&
							<div className="ml-4">
								<LoadingSpinner />
							</div>
						}
					</div>
				</Form>
			)}
		</Formik >
	);
}