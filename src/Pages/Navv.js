import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import logout from '../PureFunctions/Logout';
import './Styles/Nav.css';

const Navv = () => {
  const history = useHistory();
  const toke = JSON.parse(localStorage.getItem('token'));
  return (
    <Navbar className="nav d-flex justify-content-between" expand="lg">
      <Container fluid className="d-flex justify-content-between">
        <h3 className="py-2 mx-auto text-white">Track.it</h3>
        <Navbar.Toggle
          className="position-absolute my-3 top-0 end-0 toglle"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          {toke ? (
            <Nav className="w-100 d-md-flex justify-content-md-end">
              <Link
                className="text-decoration-none mx-md-3 link-light text-center"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-decoration-none mx-md-3 link-light text-center"
                to="/addrecord"
              >
                Add Record
              </Link>
              <button
                className="logout-btn text-decoration-none mx-md-3 text-center"
                type="submit"
                onClick={() => logout(history)}
              >
                Log out
              </button>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Link className="text-decoration-none link-light" to="/">
                Home
              </Link>
              <Link className="text-decoration-none link-light" to="/login">
                Login
              </Link>
              <Link className="text-decoration-none link-light" to="/signup">
                Sign Up
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navv;
