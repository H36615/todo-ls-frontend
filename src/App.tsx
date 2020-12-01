import React from "react";
import "./App.css";
import MainContent from "./features/MainContent/MainContent";

function App(): JSX.Element {

	return (
		<div className="App">
			<div style={{ flex: 1 }}></div>
			<MainContent></MainContent>
			<div style={{ flex: 1 }}></div>
		</div>
	);
}

export default App;
