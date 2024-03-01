import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { createTeam } from '../services/teams-services';
import { get, set, ref, update, push, remove } from 'firebase/database';
import { db } from '../config/firebase-config';


function CreateTeams() {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);


  const handleCreateTeam = async () => {
    try {
      const newTeam = await createTeam(teamName, userData.uid);
      // Do something with the newly created team, e.g. navigate to the team page
      navigate(`/teams/${newTeam.uid}`);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Enter team name"
      />
      <button onClick={handleCreateTeam}>Create Team</button>
    </div>
  );
}

export default CreateTeams;



// export default function Teams() {
  // const { user } = useFirebaseAuth();
  // const navigate = useNavigate();
  // const [teams, setTeams] = useState([]);
 /*  const { MyTeams } = useUserProfile();
  console.log(MyTeams); */
  /* const handleTeamClick = (team) => {
    navigate(`/teams/${team.uid}`);
  }; */

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        if (MyTeams) {
          const teamsData = await getTeamsByUserUids(Object.values(MyTeams));
          setTeams(teamsData);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchData();
  }, [MyTeams]);

  const newTeam = () => {
    navigate(NEW_TEAM_PATH);
  };

  return (
    <section className="p-6 flex-1 page-with-bg">
      <div>
        <div className="flex items-center justify-between">
          <Heading title="My Teams" />
          <Button title="New team" onClick={newTeam} />
        </div>

        <div className="flex flex-wrap gap-4">
          {teams
            .filter((team) => {
              return team.members && team.members[user.uid];
            })
            .map((team) => (
              <div
                key={team.uid}
                className="w-1/4 cursor-pointer relative"
                onClick={() => handleTeamClick(team)}
              >
                <div
                  className="border flex = justify-center flex-col opacity-90 hover:opacity-100 transition border-spacing-1 p-4 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 dark:border-gray-700 lg:mb-0"
                  style={{ background: '#495164' }}
                >
                  <div className="text-l font-bold tracking-tight text-gray-50 dark:text-white pr-16">
                    {team.name}
                  </div>

                  <p className="text-sm text-gray-400">
                    {`${Object.keys(team.members || {}).length} member${
                      Object.keys(team.members || {}).length !== 1 ? 's' : ''
                    } `}
                  </p>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '-10px',
                    right: '16px',
                    userSelect: 'none',
                  }}
                >
                  <svg
                    className="flex-shrink-0 w-20 h-20 opacity-20 text-gray-50 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
} */