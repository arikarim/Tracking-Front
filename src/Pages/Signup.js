import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useHistory } from 'react-router';
import './registration.css';

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const toke = JSON.parse(localStorage.getItem('token'));
  if (toke !== '') {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('http://localhost:3001/users', {
        user: {
          email,
          password,
        },
      });
      localStorage.setItem('token', JSON.stringify(data.headers.authorization));
      localStorage.setItem('user', JSON.stringify(data.data.user));
      setUser(data.data.user);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup-div">
      <form
        onSubmit={handleSubmit}
        className="my-5 d-flex flex-column  col-10 col-md-8 mx-auto p-5"
      >
        <label htmlFor="email" className="col-form-label my-2">
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="my-3"
            type="email"
            placeholder="email"
            required
          />
        </label>
        <label htmlFor="password" className="col-form-label my-2">
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
          Sign up
        </button>
        <a className="text-decoration-none link-dark my-2" href="/login">
          Log in
        </a>
      </form>
    </div>
  );
};

Signup.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Signup;
