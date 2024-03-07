import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
/**
 * 
 * @param {{ children: any }} props 
 * @returns 
 */

export default function Authenticated({ children }) {
  const { user } = useContext(AppContext);
  const { userData, setContext } = useContext(AppContext)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/", { state: { from: location } });
    }
  })

  return (
    <>
      {children}
    </>
  )
}

Authenticated.propTypes = {
  children: PropTypes.any.isRequired,
  user: PropTypes.object,
};
