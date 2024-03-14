import React from 'react'
import Proptypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getUserTeams } from '../services/user-service';

export default function Teams() {
  const { userData } = useAppContext();
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    (async () => {
      if (!userData) return
     
        setTeamsData(await getUserTeams(userData.username));
    })()
    // fetch teams data
  },[])

console.log(teamsData);
  const location = useLocation();
  const teamData = location.state?.teamData;

  
  return (
    <div>
      {teamsData && (
        <div>
          <p>Teams:</p>
          <p>Name: {teamsData}</p>
          <p>Add member</p>
        </div>
      )}
    </div>
  );
}


// components that display all