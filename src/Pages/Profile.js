import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import image from "../images/react.png";
import "./profile.css";
import "./pro.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const Profile = () => {
  const userr = useSelector((state) => state.user);
  return (
    <Container className="cont bg-light">
      <Row>
        <Col className="mx-auto d-flex flex-column align-content-center" lg={6}>
          <img
            className="user-image mx-auto my-2"
            src={
              (userr &&
                userr.image_data &&
                userr.image_data.metadata.cloudinary.secure_url) ||
              image
            }
            alt="avatar"
          />
          {console.log(userr)}
          <h1 className="text-dark text-center">{userr && userr.name}</h1>
          <p className=" text-center">
            {(userr && userr.bio) || "Not available"}
          </p>
          <p className=" text-center">
            {(userr && userr.about) || "Not available"}
          </p>
          <Link className="btn btn-light" to="/editprofile">
            Edit profile
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
