import { Container } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router";

const EditProfile = () => {
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState(null);
  const userr = JSON.parse(localStorage.getItem("user"));

  const toke = JSON.parse(localStorage.getItem("token"));
  const valid = JSON.parse(localStorage.getItem("valid"));
  if (!toke || valid === "invalid") {
    return <Redirect to={"/login"} />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("user[bio]", bio);
    body.append("user[about]", about);
    body.append("user[current_password]", password);
    body.append("user[image]", image);

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: toke,
    };
    try {
      const data = await axios.put("http://localhost:3001/users", body, {
        headers: headers,
      });
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="cont">
      <Form className="cont" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            onChange={(e) => setBio(e.target.value)}
            type="text"
            defaultValue={userr.bio}
            placeholder="Enter Bio"
            maxLength="140"
            required
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
