import React from 'react';
import propTypes from 'prop-types';
import RepoItem from './RepoItem';

function Repos({repos}) {
    return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
};

Repos.propTypes = {
    repos: propTypes.array.isRequired
}; 

export default Repos
