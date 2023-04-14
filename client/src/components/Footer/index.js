import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Parallax } from "react-parallax";
import logo from "../../images/rosbacowhite.png";

import "./index.css";

const Footer = ({data}) => {
  return (
    <div className={`${data.ocultar === true ? "d-none" : ""}`}>
      <Parallax
        bgImage={data.urlImagen}
        strength={400}
        blur={{ min: -15, max: 15 }}
        renderLayer={() => (
          <div
            style={{
              position: "absolute",
              background: `rgba(0, 0, 0, .8)`,
              width: "100%",
              height: "100%",
            }}
          />
        )}
      >
        <div className="footer text-center">
          <footer>
            <Container>
              <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <Image src={logo} className="img-fluid"></Image>
                    <a href={"http://www.rosbacopartners.com"}>www.rosbacopartners.com</a>
                </Col>
              </Row>
            </Container>
          </footer>
        </div>
      </Parallax>
    </div>
  );
};

export default Footer;
