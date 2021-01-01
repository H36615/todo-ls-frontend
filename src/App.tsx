import React from "react";
import "./App.css";
import "./styles/main.css";
import MainContent from "./features/MainContent/MainContent";

function App(): JSX.Element {
	return (
		<div className="App">
			<div className="flex-1" />
			<MainContent />
			<div className="flex-1" />
		</div>
	);
}

export default App;
