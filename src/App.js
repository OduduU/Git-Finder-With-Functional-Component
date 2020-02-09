import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import { Alert } from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import { NotFound } from "./components/pages/NotFound";

function App() {
	const [alert, setAlert] = useState(null);

	// Set Alert
	const giveAlert = (msg, type) => {
		setAlert({ msg, type });

		setTimeout(() => {
			setAlert(null);
		}, 5000);
	};

	return (
		<div className="App">
			<Navbar title="Github Finder" icon="fab fa-github" />
			<div className="container">
				<Alert alert={alert} />
				<Switch>
					<Route exact path="/">
						<Search
							setAlert={giveAlert}
						/>
						<Users />
					</Route>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/user/:login">
						<User />
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;
