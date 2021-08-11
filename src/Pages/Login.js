import axios from 'axios';
import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import './registration.css';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import createUser from '../Actions/user';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('http://localhost:3001/users/sign_in', {
        user: {
          email,
          password,
        },
      });
      localStorage.setItem('valid', JSON.stringify('valid'));
      localStorage.setItem('token', JSON.stringify(data.headers.authorization));
      localStorage.setItem('user', JSON.stringify(data.data.user));
      setUser(data.data.user);
      history.push('/');
      dispatch(createUser(data.data.user));
    } catch (error) {
      console.log(error);
    }
  };
  const toke = JSON.parse(localStorage.getItem('token'));
  const valid = JSON.parse(localStorage.getItem('valid'));
  if (toke && valid === 'valid') {
    return <Redirect to="/login" />;
  }

  return (
    <div className="login-div">
      <form
        onSubmit={handleSubmit}
        className="my-5 d-flex flex-column  col-10 col-md-8 mx-auto p-5"
      >
        <label htmlFor="email1" className="col-form-label my-2 d-flex flex-column">
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email1"
            id="email1"
            className="my-3"
            type="email"
            placeholder="email"
            required
          />
        </label>
        <label htmlFor="password" className="col-form-label my-2 d-flex flex-column">
          Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="my-3"
            type="password"
            placeholder="password"
            required
          />
        </label>
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

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default Login;
