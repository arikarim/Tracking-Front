import axios from "axios";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import "./registration.css";
import { createUser } from "../Actions/user";
import { useDispatch } from "react-redux";

const Login = ({ setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:3001/users/sign_in", {
        user: {
          email: email,
          password: password,
        },
      });
      // dispatch(createUser(data.data.user));
      localStorage.setItem("token", JSON.stringify(data.headers.authorization));
      localStorage.setItem("user", JSON.stringify(data.data.user));
      setUser(data.data.user);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (user === "Logged") {
    return <Redirect to={"/"} />;
  }

  return (
    <div className="login-div">
      <form
        onSubmit={handleSubmit}
        className="my-5 d-flex flex-column  col-10 col-md-8 mx-auto p-5"
      >
        <label htmlFor="email" className="col-form-label my-2">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="my-3"
          type="email"
          placeholder="email"
          required
        />
        <label htmlFor="password" className="col-form-label my-2">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          className="my-3"
          type="password"
          placeholder="password"
          required
        />
        <button className="my-2 btn btndark" type="submit">
          Log in
        </button>
        <a className="text-decoration-none link-dark my-2" href="/signup">
          Sign up
        </a>
      </form>
    </div>
  );
};

export default Login;
