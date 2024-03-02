import React from 'react'
import CreateTeams from './CreateTeams'
import { db } from '../config/firebase-config';
import { get, ref, query, orderByChild, equalTo } from "firebase/database";
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

function SingleTeamView() {

    const [team, setTeam] = useState();

    const { teams } = useContext(AppContext);
    console.log(teams);

    
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
// displays all chanells in this team