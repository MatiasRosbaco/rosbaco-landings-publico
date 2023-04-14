import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./index.css";
import content from "../../utils/render.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import BulletSection from "../BulletSection/index";
import DescriptionSection from "../DescriptionSection/index";

const MapSection = ({ data }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <>
      <div
        className={`${data.ocultar === true ? "d-none" : ""} maps-items ${data.background === "black" ? "dark" : ""} text-${data.textoalineacion}`}
        id={data.ancla}
        style={{background: `${data?.bghex}`}}
      >
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            visible: {
              opacity: 1,
              transition: {
                transition: {
                  delay: 0.2,
                },
                duration: 1,
              },
            },
            hidden: { opacity: 0 },
          }}
          className="content"
        >
          <Container className="map-container">
            <Row>
              <Col md={8} className="align-self-center" className={`${isMobile ? 'mb-2' : ''}`} >
                <div className={`${isMobile ? 'align-self-center' : 'align-self-center map'}`}>
                  <Image className="img-fluid" src={data.urlImagen}></Image>
                </div>
              </Col>
              <Col
                md={{
                  span: 4,
                  order: data.align === "left" ? "first" : "last",
                }}
                className={`${isMobile ? 'p-5' : ''}`}
              >
                {!!data.titulo || data.titulo !== "" ? (
                  <h1 className={`text-${data.tituloalign}`} style={{color: `${data?.titulohex}`}} dangerouslySetInnerHTML={content(data.titulo)}></h1>
                ) : (
                  <></>
                )}
                {!!data.subtitulo || data.subtitulo !== "" ? (
                  <h4 className={`text-${data.subtituloalign}`} style={{color: `${data?.subtitulohex}`}} dangerouslySetInnerHTML={content(data.subtitulo)}/>
                ) : (
                  <></>
                )}
                <Row>
                  {!!data.sitiosInteres && data.sitiosInteres.length > 0 ? (
                    data.sitiosInteres.map((categoria, i) => {
                          return (
                        
                            <Col md={6} key={i++} style={{color: `${data?.descripcionhex}`}} className="list-detail">
                              
                              <h5 style={{color: `${data?.descripcionhex}`}} className="item">
                                <FontAwesomeIcon className="icon" icon={faCircle} />
                                {categoria.categoria}
                              </h5>
                              <ul style={{color: `${data?.descripcionhex}`}}>
                                {categoria.content.map((data, i) => {
                                  return (
                                   
                                      <li style={{color: `${data?.descripcionhex}`}} key={i++}>
                                        {`${data.item} ${data.name}`}
                                        <span  key={i++}>{data.descripcion}</span>
                                      </li>
                                  );
                                })}
                              </ul>
                            </Col>
                        );
                    })
                  ) : (
                    <></>
                  )}
                  <DescriptionSection descripcion={data.descripcion2} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
                  <BulletSection bullet={data.bullet} color={data?.descripcionhex}/>
                </Row>
              </Col>
            </Row>
          </Container>
        </motion.div>
      </div>
    </>
  );
};

export default MapSection;
