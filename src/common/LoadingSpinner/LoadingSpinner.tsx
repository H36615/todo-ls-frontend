
import React from "react";

export default function LoadingSpinner(props: { xySizeInPx?: number }): JSX.Element {
	return (
		<svg className="animate-spin" xmlns="http://www.w3.org/2000/svg"
			width={(props.xySizeInPx || 28) + "px"} height={(props.xySizeInPx || 28) + "px"}
			viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" ><circle cx="50" cy="50" r="29"
				strokeWidth="10" stroke="#111111" strokeDasharray="45.553093477052 45.553093477052"
				fill="none" strokeLinecap="round" transform="matrix(1,0,0,1,0,0)"></circle></svg>
	);
}