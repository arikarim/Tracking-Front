import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import alertt from '../PureFunctions/alert';

const EditProfile = () => {
  const userr = useSelector((state) => state.user);
  const [bio, setBio] = useState(userr.bio);
  const [name, setName] = useState(userr.name);
  const [about, setAbout] = useState(userr.about);
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();
  const toke = JSON.parse(localStorage.getItem('token'));
  const valid = JSON.parse(localStorage.getItem('valid'));
  if (!toke || valid === 'invalid') {
    return <Redirect to="/login" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append('user[name]', name);
    body.append('user[bio]', bio);
    body.append('user[about]', about);
    body.append('user[current_password]', password);
    if (image) {
      body.append('user[image]', image);
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: toke,
    };
    try {
      const data = await axios.put('https://cryptic-falls-25172.herokuapp.com/users', body, {
        headers,
      });
      localStorage.setItem('correctuser', JSON.stringify(data.data));
      history.push('/');
      alertt('Profile updated');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <Container className="cont">
      <Form className="cont" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type="text"
            defaultValue={userr.name}
            placeholder="Enter Name"
            maxLength="100"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            onChange={(e) => setBio(e.target.value)}
            type="text"
            defaultValue={userr.bio}
            placeholder="Enter Bio"
            maxLength="140"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBio">
          <Form.Label>About</Form.Label>
          <Form.Control
            onChange={(e) => setAbout(e.target.value)}
            as="textarea"
            defaultValue={userr.about}
            placeholder="About you"
            maxLength="500"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBio">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBio">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            maxLength="500"
            required
          />
        </Form.Group>

        <button className="btn btn-dark w-100 my-3" type="submit">
          Submit
        </button>
      </Form>
    </Container>
  );
};

export default EditProfile;
