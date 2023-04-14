import React, { useEffect } from "react";
import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import content from "../../utils/render.js";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BulletSection from "../BulletSection/index";
import DescriptionSection from "../DescriptionSection/index";

const TextoSection = ({ data }) => {
  
  let descripcion = data.descripcion ? [data.descripcion.substr(0, 800), data.descripcion.substr(801)] : '';
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
        className="content"
      >
        <Container>
          <Row>
            <>
              <Col md={12}>
                <h1 className={`text-${data.tituloalign}`} style={{color: `${data?.titulohex}`}}>{data.titulo}</h1>
                <h4 className={`text-${data.subtituloalign}`} style={{color: `${data?.subtitulohex}`}}>{data.subtitulo}</h4>
              </Col>
              <Col md={6}>
                <DescriptionSection descripcion={descripcion[0]} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
              </Col>
              <Col md={{ span: 6 }}>
                <DescriptionSection descripcion={descripcion[1]} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
              </Col>
              <DescriptionSection descripcion={data.descripcion2} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
              <BulletSection bullet={data.bullet} color={data?.descripcionhex}/>
            </>
          </Row>
        </Container>
      </motion.div>
    </div>
  );
};

export default TextoSection;
