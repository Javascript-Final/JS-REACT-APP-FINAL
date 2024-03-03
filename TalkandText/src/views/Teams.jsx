import React from 'react'
import Proptypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import CreateChannel from './CreateChannel';

export default function Teams({}) {

  const location = useLocation();
  const teamData = location.state?.teamData;
  
  return (
    <div>
      {teamData && (
        <div>
          <p>Teams:</p>
          <p>Name: {teamData.name}</p>
          <p>Add member</p>
         <CreateChannel />
        </div>
      )}
    </div>
  );
}


// components that display all