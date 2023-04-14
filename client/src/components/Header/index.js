import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link as Alink } from "react-scroll";
import "./index.css";
const Header = ({ data, logo }) => {
  return (
    <>
      <Navbar fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <img
              src={logo}
              className="d-inline-block align-top img-fluid"
              alt="Rosbaco Logo"
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav>
              {data.map((page, i) => {
                return (
                  <Nav.Link as={Alink} className="nav-link-custom" activeClass="active" spy={true} smooth={true} to={`${page.ancla}`} delay={100} duration={1000} key={i}>
                    {page.titulo}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
