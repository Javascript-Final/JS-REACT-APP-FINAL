import { useState } from "react";
import { registerUser } from "../services/auth-service";
import { createUserHandle } from "../services/user-service";
import { getUserByHandle } from "../services/user-service";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    handle: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
    setError("");
  };

  const register = async () => {
    if (form.firstName.length < 5 || form.firstName.length > 35) {
      setError("First name must be unique and have between 5 and 35 symbols!");
      return;
    }

    if (form.lastName.length < 4 || form.lastName.length > 32) {
      setError("Family name must be unique and have between 5 and 35 symbols");
      return;
    }

    if (!form.handle) {
      setError("User name is required!");
      return;
    }

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isValid = isValidEmail(form.email);

    if (!isValid) {
      setError("Invalid email!");
      return;
    }

    if (!form.password) {
      setError("Password is required!");
      return;
    }

    try {
      const user = await getUserByHandle(form.handle);
      if (user.exists()) {
        console.log(user.val());
        return console.log(
          `User name @${form.handle} all ready exist!`
        );
      }
      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(
        form.firstName,
        form.lastName,
        form.handle,
        credentials.user.uid,
        form.email
      );

      setContext({ user, userData: null });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div id="sign-up-view">
      <h1>Register</h1>
      {error && <div id="error">{error}</div>}
      <label htmlFor="firstName">First Name</label>
      <input
        value={form.firstName}
        onChange={updateForm("firstName")}
        type="text"
        name="firstName"
        id="firstName"
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        value={form.lastName}
        onChange={updateForm("lastName")}
        type="text"
        name="lastName"
        id="lastName"
      />
      <label htmlFor="handle">Handle</label>
      <input
        value={form.handle}
        onChange={updateForm("handle")}
        type="text"
        name="handle"
        id="handle"
      />
      <br />
      <label htmlFor="email" >Email</label>
      <input
        value={form.email}
        onChange={updateForm("email")}
        type="text"
        name="email"
        id="email"
      />
      <br />
      <label htmlFor="password">Password</label>{" "}
      <input
        value={form.password}
        onChange={updateForm("password")}
        type="password"
        name="password"
        id="password"
      />{" "}
      <br /> <br />
      <button onClick={register}>Register</button>
    </div>
  );
}
