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
						Note that the test user and all its data is available
						to everyone to see and modify.
					</p>
					: <p>
						You can test the app using public test user.
					</p>
				}
				<div className="mt-2">
					<BasicButton
						type="button"
						onClick={props.agreeOnTestUserInfoFill}>
						{props.showWarning
							? <p>Understood. Fill in the fields</p>
							: <p>Ok, fill in the fields...</p>
						}
					</BasicButton>
				</div>
			</div>
		</Note>
	);
}