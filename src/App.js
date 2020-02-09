import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import { Alert } from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

function App() {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);

			const users = await axios.get(
				`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			setUsers(users.data);
			setLoading(false);
		}

		fetchData();
		// eslint-disable-next-line
	}, []);

	// Search github users
	const searchUsers = async text => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setUsers(res.data.items);
		setLoading(false);
	};

	// Get single Github user
	const getUser = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setUser(res.data);
		setLoading(false);
	};

	// Get user repos
	const getUserRepos = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setRepos(res.data);
		setLoading(false);
	};

	// Clear users from state
	const clearUsers = e => {
		setUsers([]);
		setLoading(false);
	};

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
							searchUsers={searchUsers}
							clearUsers={clearUsers}
							showClear={users.length > 0 ? true : false}
							setAlert={giveAlert}
						/>
						<Users loading={loading} users={users} />
					</Route>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/user/:login">
						<User
							getUser={getUser}
							user={user}
							loading={loading}
							getUserRepos={getUserRepos}
							repos={repos}
						/>
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;
