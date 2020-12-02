import React from "react";
import { config } from "../../config/config";
import "./MainContent.css";

export default function MainContent(): JSX.Element {

	return (
		<div className="MainContent">
			<a href={config.sourceCodeUrl}
				className="items-center rounded-md
				border px-3 py-1
				text-gray-700 bg-white bg-opacity-80
				hover:bg-gray-200 hover:bg-opacity-30
				focus:outline-none"
				style={{ minWidth: "10px", margin: "10px 0" }}>
				<p className="bold">Check out the src code</p>
			</a>

			<div className="panel rounded-lg border-solid border border-black
				border-opacity-20">
				lorem ipsum
			</div>
		</div>
	);
}