import { useContext, useState } from 'react'
import { registerUser } from '../services/auth-service';
import { createUserHandle, getUserByHandle } from '../services/user-service';
import { AppContext } from '../context/AppContext';
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
    const { setContext } = useContext(AppContext);
    const [form, setForm] = useState({
        handle: '',
        firstName: '',
        lastName: '',
        email: '',  
        password: '',
    });

    const navigate = useNavigate();
    
    const updateForm = prop => e => {
        setForm({...form, [prop]: e.target.value });
    };

    const register = async () => {

        try {
            const user = await getUserByHandle(form.handle);
            if(user.exists()) {
                return console.log(`Handle ${form.handle} allready exist !`);
            }
            const credentials = await registerUser(form.email, form.password);
            await createUserHandle(form.username, form.firstName, form.lastName, credentials.user.uid, form.email);

            setContext({ user, userData: null });
            navigate('/');
        } catch (error) {
            if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                alert("Email already in use")
            }
        }
    };

  return (
    <div>
        <h1>Register</h1>
        <label htmlFor="first-name">First name: </label><input value={ form.firstName } onChange={updateForm('firstName')} type="text" name='first-name' id='first-name' /><br />
        <label htmlFor="last-name">Last name: </label><input value={ form.lastName } onChange={updateForm('lastName')} type="text" name='last-name' id='last-name' /><br />
        <label htmlFor="handle">Handle: </label><input value={ form.handle } onChange={updateForm('handle')} type="text" name='handle' id='handle' /><br />
        <label htmlFor="email">Email: </label><input value={ form.email } onChange={updateForm('email')} type="text" name='email' id='email' /><br />
        <label htmlFor="password">Password: </label><input value={ form.password } onChange={updateForm('password')}  type="password" name='password' id='password' /><br />
        <button onClick={register}>Register</button>

    </div>
  )
}

export default Register
