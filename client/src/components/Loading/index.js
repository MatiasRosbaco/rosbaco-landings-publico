/* eslint-disable no-unused-expressions */
import React from "react";
import "./style.css";
import logo from "../../images/flowrosbaco.png";
import { Container, Row, Col, Image } from "react-bootstrap";

const Loading = ({ data }) => {
  return (
    <div className="loading text-center ">
      <Container className="h-100">
      <Row className="align-items-center h-100">
        <Col className=" mx-auto" md={{ span: 4, offset:4 }}>
          
              <Image className="img-fluid animate__animated animate__pulse animate__infinite" src={logo}></Image>
          
        </Col>
      </Row>
      </Container>
    
    </div>
  );
};
export default Loading;
