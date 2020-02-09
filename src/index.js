import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';

import GithubState from './context/github/GithubState'; 

ReactDOM.render(<GithubState><Router><App /></Router></GithubState>, document.getElementById('root'));

