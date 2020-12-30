import React from "react";
import BasicButton from "../../common/BasicButton/BasicButton";
import Note from "../../common/Note/Note";

interface FillTestUserInfoNoteProps {
	showWarning: boolean,
	agreeOnTestUserInfoFill: () => void,
}

export default function FillTestUserInfoNote(props: FillTestUserInfoNoteProps): JSX.Element {
	return (
		<Note type={props.showWarning ? "warn" : "info"}>
			<div>
				{props.showWarning
					? <p>
						By using the shared test account, you agree that the
						account is used by other users and its content is
						uncesored and unsupervised.
					</p>
					: <p>
						If you just want to test the app, you can sign in using
						shared, publicly available testing user.
					</p>
				}
				<div className="mt-2">
					<BasicButton
						type="button"
						onClick={props.agreeOnTestUserInfoFill}>
						{props.showWarning
							? <p>I agree on the above, fill in the fields now</p>
							: <p>Ok, fill in the fields for me...</p>
						}
					</BasicButton>
				</div>
			</div>
		</Note>
	);
}