import React from 'react'
import Proptypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
// import { getUserTeams } from '../services/user-service';
import { getOwnedTeamsFor } from '../services/teams-services';

export default function Teams() {
  const { userData } = useAppContext();
  const [teamsData, setTeamsData] = useState([]);
  console.log(userData);

/*   useEffect(() => {
    (async () => {
      if (!userData) return
      setTeamsData(await showUserTeams())
    })()
    // fetch teams data
  }, [])
  console.log(teamsData); */
  /* const showMyTeams = async () => {
    if (!userData) return
    setTeamsData(await getOwnedTeamsFor(userData?.username))
  } */
  useEffect(() => {

  (async () => {
    if (!userData) return
    setTeamsData(await getOwnedTeamsFor(userData?.username))
  })()
  }, [userData])
 console.log(teamsData);
  
    // show user teams 
  
   

  /* const location = useLocation();
  const teamData = location.state?.teamData; */
  // console.log(teamData.name);

  
  return (
    <div>
      
        <div>
          <p>T</p>
          <p>T</p>
          <p>My teams:</p>

          {teamsData.map((team) => (
            <div key={team.tid}>
              <p>{team.name}</p>
            </div>
          ))}
        </div>
      
    </div>
  );
}


// components that display all