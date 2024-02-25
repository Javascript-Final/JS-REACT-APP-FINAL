import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth-service";




export default function Login() {
    const { user, setContext } = useContext(AppContext);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const location = useLocation();

   

    const updateForm = prop => e => {
        setForm({...form, [prop]: e.target.value });
    };

    useEffect(() => {
        if( user) {
            navigate(location.state?.from.pathname || '/');
        }
    }, [user])

    const login = async () => {
        try{
        const credentials = await loginUser(form.email, form.password)
        setContext({ user: credentials.user, userData: null });
        } catch (error) {
            console.log(error);
        }    
    };

    return (
        <div>
     <h1>Login</h1>
     <label htmlFor="email">Email: </label><input value={form.email} onChange={updateForm('email')} type="text" id="email" name="email" /> <br /><br />
     <label htmlFor="email">Password: </label><input value={form.password} onChange={updateForm('password')} type="text" id="password" name="password" /> <br /><br />
    <button onClick={login} >Login</button>
        </div>
    )
}