import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../PureFunctions/Logout";
import "./Nav.css";
const Navv = ({ setUser }) => {
  const history = useHistory();
  const toke = JSON.parse(localStorage.getItem("token"));
  return (
    <Navbar className="nav" expand="lg">
      <Container fluid={true} className="">
        <h3 className="py-2 mx-auto text-white">Track.it</h3>
        <Navbar.Toggle
          className="position-absolute my-3 top-0 end-0 toglle"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          {toke !== "" ? (
            <Nav className="">
              <Link
                className="text-decoration-none link-light text-center"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-decoration-none link-light text-center"
                to="/addrecord"
              >
                Add Record
              </Link>
              <div
                className="logout-btn text-decoration-none text-center"
                type="submit"
                onClick={(e) => logout(setUser, history)}
              >
                Log out
              </div>
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
    // <nav className="">
    //   {toke === "" ? (
    //     <div>
    //
    //       <h3 className="py-3 text-center text-white">Track.it</h3>
    //     </div>
    //   ) : (
    //     <Navbar bg="light" expand="lg">
    //       <Container>
    //         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //         <Navbar.Collapse id="basic-navbar-nav">
    //           <Nav className="me-auto">
    //             <Nav.Link href="#home">Home</Nav.Link>
    //             <Nav.Link href="#link">Link</Nav.Link>
    //             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //               <NavDropdown.Item href="#action/3.2">
    //                 Another action
    //               </NavDropdown.Item>
    //               <NavDropdown.Item href="#action/3.3">
    //                 Something
    //               </NavDropdown.Item>
    //               <NavDropdown.Divider />
    //               <NavDropdown.Item href="#action/3.4">
    //                 Separated link
    //               </NavDropdown.Item>
    //             </NavDropdown>
    //           </Nav>
    //         </Navbar.Collapse>
    //       </Container>
    //     </Navbar>
    //     // <ul className="list-unstyled d-flex py-3 justify-content-end">
    //     //   <li className="mx-3">
    //     <Link className="text-decoration-none link-light" to="/signup">
    //       Sign Up
    //     </Link>
    //     //   </li>
    //     //   <li className="mx-3">
    //     <Link className="text-decoration-none link-light" to="/login">
    //       Login
    //     </Link>
    //     //   </li>
    //     // </ul>
    //     // <ul className="list-unstyled d-flex py-3 justify-content-end">
    //     //   <h3 className="py-3 text-center text-white">Track.it</h3>
    //     //   <li className="mx-3">
    //     //     <Link className="text-decoration-none link-light" to="/">
    //     //       Home
    //     //     </Link>
    //     //   </li>
    //     //   <li className="mx-3">
    //     //     <Link className="text-decoration-none link-light" to="/addrecord">
    //     //       Add Record
    //     //     </Link>
    //     //   </li>

    //     // </ul>
    //   )}
    // </nav>
  );
};

export default Navv;
