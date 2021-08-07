import { Container } from "@material-ui/core";
import React from "react";
import { Col, Row } from "react-bootstrap";
import image from "../images/react.png";
import "./profile.css";
import "./pro.css";
import { Link } from "react-router-dom";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Container className="cont bg-light">
      <Row>
        <Col className="mx-auto d-flex flex-column align-content-center" lg={6}>
          <img
            className="user-image mx-auto my-2"
            src={user.image_data || image}
            alt="avatar"
          />
          <h1 className="text-dark text-center">{user.bio || "Stranger"}</h1>
          <p className=" text-center">{user.about || "Not available "}</p>
          <Link className="btn btn-light" to="/editprofile">
            Edit profile
          </Link>
          {/* <div className="progress__chart__text">
            <span className="txt">You achieved</span>
            <span className="num">60</span>
            <span className="txt">on average</span>
          </div>
          <div className="progress__chart__container"></div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
