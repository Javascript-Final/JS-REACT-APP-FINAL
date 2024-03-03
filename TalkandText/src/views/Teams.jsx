import React from 'react'
import Proptypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import CreateChannel from './CreateChannel';

export default function Teams({}) {

  const location = useLocation();
  const teamData = location.state?.teamData;
  
  return (
    <div>
      <h2>Teams Component</h2>
      {teamData && (
        <div>
          <p>Created Team:</p>
          <p>Name: {teamData.name}</p>
          <p>Name: {teamData.owner}</p>
         <CreateChannel />
        </div>
      )}
    </div>
  );
}


// components that display all