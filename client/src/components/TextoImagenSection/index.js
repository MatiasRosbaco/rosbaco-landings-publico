import React, { useEffect } from "react";
import "./index.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import content from "../../utils/render.js";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { isMobile } from "react-device-detect";
import BulletSection from "../BulletSection/index";
import DescriptionSection from "../DescriptionSection/index";


const TextoImagenSection = ({ data }) => {
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
    <div
    id={data.ancla}
      className={`${data.ocultar === true ? "d-none" : ""} texto-section ${data.background === "black" ? "dark" : ""} text-${data.textoalineacion}`}
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
        className={`${isMobile ? "" : "content"}`}
      >
        <Container className={`${isMobile ? "mobile-content" : ""}`}>
          <Row>
            <Col
              md={4}
              md={{
                    span: data.align === "left" ? 5 : 4,
                    offset: data.align === "left" ? 5 : 0,
                    order: data.align === "left" ? "first" : "last",
                  }}  
              className={`${isMobile ? "align-self-center mobile-text" : ""}`}
            >
              
              <h1 className={`text-${data.tituloalign}`} style={{color: `${data?.titulohex}`}} dangerouslySetInnerHTML={content(data.titulo)}></h1>
              <h4 className={`text-${data.subtituloalign}`} style={{color: `${data?.subtitulohex}`}} dangerouslySetInnerHTML={content(data.subtitulo)}></h4>
              <DescriptionSection descripcion={data.descripcion} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
              <DescriptionSection descripcion={data.descripcion2} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
              <BulletSection bullet={data.bullet} color={data?.descripcionhex}/>
            </Col>
            <Col
              className={`${isMobile ? "mobile-content" : "text-center"}`}
              md={{
                span: 8,
                order: data.align === "left" ? "first" : "last",
              }}>
              <Image className={`img-fluid ${isMobile ? 'mt-5' : ''}`} src={data.urlImagen}></Image>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </div>
  );
};

export default TextoImagenSection;
