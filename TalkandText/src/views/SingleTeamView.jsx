import React from 'react'
import CreateTeams from './CreateTeams'
import { db } from '../config/firebase-config';
import { get, ref, query, orderByChild, equalTo } from "firebase/database";
import PropTypes from 'prop-types';

function SingleTeamView() {
    
    return (
        <div>SingleTeamView
                <div>
                        <h1>name</h1>
                        
                        <h2>Team Members</h2>
                        <h2>Channels</h2>
                </div>
        </div>
    )
}

export default SingleTeamView

SingleTeamView.propTypes = {
    teamName: PropTypes.string,
}