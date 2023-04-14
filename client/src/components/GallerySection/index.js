import React, { useEffect, useState } from "react";
import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import content from "../../utils/render.js";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { isMobile } from "react-device-detect";
import BulletSection from "../BulletSection/index";
import DescriptionSection from "../DescriptionSection/index";

const GallerySection = ({ data }) => {
  const [texto, setTexto] = useState({
    titulo: data[0].titulo,
    subtitulo: data[0].subtitulo,
    descripcion: data[0].descripcion,
  });
  let arr = [];
  data.map((i) => {
    if (!!i.urlImagen) {
      arr.push({
        original: i.urlImagen,
        thumbnail: i.urlImagen,
      });
    }
  });
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
      className={`${data[0].ocultar === true ? "d-none" : ""} gallery-section ${data[0].background === "black" ? "dark" : ""} text-${data[0].textoalineacion}`}
      id={data[0].ancla}
      style={{background: `${data[0]?.bghex}`}}
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
        <Container className={`${isMobile ? "" : "gallery-container"}`} >
          <Row>
            <>
              <Col md={6} className={`${isMobile ? "align-self-center p-5" : "pr-6 align-self-center"}`}>
                {!!data.titulo || data.titulo !== "" ? (
                  <h1 className={`text-${data[0].tituloalign}`} style={{color: `${data[0]?.titulohex}`}} dangerouslySetInnerHTML={content(texto.titulo)}></h1>
                ) : (
                  <></>
                )}
                {!!data.subtitulo || data.subtitulo !== "" ? (
                  <h4 className={`text-${data[0].subtituloalign}`} style={{color: `${data[0]?.subtitulohex}`}} dangerouslySetInnerHTML={content(texto.subtitulo)}></h4>
                ) : (
                  <></>
                )}
                <DescriptionSection descripcion={data.descripcion} descripcionalign={data[0].descripcionalign} descripcionhex={data[0]?.descripcionhex}/>
                <DescriptionSection descripcion={data.descripcion2} descripcionalign={data[0].descripcionalign} descripcionhex={data[0].descripcionhex}/>
                <BulletSection bullet={data.bullet} color={data?.descripcionhex}/>
              </Col>
              <Col
                className={`text-center`}
                md={{
                  span: 6,
                  order: data[0].align === "left" ? "first" : "last",
                }}
              >
                <ImageGallery
                  showNav={false}
                  showPlayButton={false}
                  items={arr}
                  
                />
              </Col>
            </>
          </Row>
        </Container>
      </motion.div>
    </div>
  );
};

export default GallerySection;
