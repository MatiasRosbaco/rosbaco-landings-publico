import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./index.css";
import ImageMapper from "react-image-mapper";
import { isMobile } from "react-device-detect";
import "react-bnb-gallery/dist/style.css";
import ReactBnbGallery from "react-bnb-gallery";
import BulletSection from "../BulletSection/index";
import DescriptionSection from "../DescriptionSection/index";

import content from "../../utils/render.js";

var imageMapResize = require("image-map-resizer");

var PHOTOS = [];
var datosContrafrente1 = '';
const MapaUnidadSection = ({ data }) => {
  imageMapResize();
  const el = useRef(React.createRef());
  const [dataUnidad, setDataUnidad] = useState(data[0]);
  const [isOpen, setIsOpen] = useState(false);
  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([el.current.clientWidth, el.current.clientWidth]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  };
  const [width, height] = useWindowSize();
  let unidad = {
    name: "mapa-unidad",
    areas: [],
  };
  if (!!data) {
    data.map((element, i) => {
      unidad.areas.push({
        data: element,
        name: i,
        shape: `${
          element.shape === undefined || element.shape === null
            ? "poly"
            : element.shape
        }`,
        coords: element.coordenadasSombra,
        // preFillColor: "rgba(136, 136, 136, .6)",
        fillColor: "rgba(237, 187, 42, .5)",
        lineWidth: 0,
        strokeColor: "rgba(0, 0, 0, .8)",
      });
    });
    unidad.areas.shift();
  }
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView, data]);
  const clicked = (area) => {
    setDataUnidad(area.data);
    if (!!area.data.unidadFuncional.imagenesUnidad) {
      PHOTOS = [];
      area.data.unidadFuncional.imagenesUnidad.map((element, i) => {
        PHOTOS.push({
          photo: element.urlImagen,
          caption: `${dataUnidad.unidadFuncional.name} `.concat(
              `${dataUnidad.unidadFuncional.metrosCubiertos}` !== 'NaN' ? `SUP. CUB ${dataUnidad.unidadFuncional.metrosCubiertos} M2` : '',
              `${dataUnidad.unidadFuncional.metrosDescubiertos}` !== "NaN" ? ` - SUP. DESC.CUB. ${dataUnidad.unidadFuncional.metrosDescubiertos} M2` : '',
              `${dataUnidad.unidadFuncional.metrosSemiCubiertos}` !== "NaN" ? ` - SUP. SEMI CUB ${dataUnidad.unidadFuncional.metrosSemiCubiertos} M2` : '',
              `${dataUnidad.unidadFuncional.metrosAmenities}` !== "NaN" ? ` - AMENITIES ${dataUnidad.unidadFuncional.metrosAmenities} M2` : '',
              `${dataUnidad.unidadFuncional.metrosCuadradosTotales}` !== "NaN" ? ` - TOTALES ${dataUnidad.unidadFuncional.metrosCuadradosTotales} M2` : ''),
          subcaption: `${dataUnidad.descripcionContrafrente1}` !== '' ? ` CONTRAFRENTE: ${dataUnidad.contraFrenteName1} - ${dataUnidad.descripcionContrafrente1}` : ''.concat(
              `${dataUnidad.descripcionContrafrente2}` !== '' ? `${dataUnidad.contraFrenteName2} - ${dataUnidad.descripcionContrafrente2}` : '',
              `${dataUnidad.descripcionContrafrente3}` !== '' ? `${dataUnidad.contraFrenteName3} - ${dataUnidad.descripcionContrafrente3}` : '',
              `${dataUnidad.descripcionContrafrente4}` !== '' ? `${dataUnidad.contraFrenteName4} - ${dataUnidad.descripcionContrafrente4}` : '',
              `${dataUnidad.descripcionContrafrente5}` !== '' ? `${dataUnidad.contraFrenteName5} - ${dataUnidad.descripcionContrafrente5}` : ''),
        });
      });

      setIsOpen(true);
    }
  };
  const enterArea = (area) => {
    setDataUnidad(area.data);
  };
  const leaveArea = () => {
    setDataUnidad(data[0]);
  };

   if(dataUnidad.contraFrenteName1 !== null){
     datosContrafrente1 =  dataUnidad.descripcionContrafrente1.split('-');
   }
  const renderContent = () => {
    if (!isMobile) {
      return (
        <>
          <div
            className={`${data.ocultar === true ? "d-none" : ""} map-unidad ${
              dataUnidad.background === "black" ? "dark" : ""
            } text-${dataUnidad.textoalineacion}`}
            id={dataUnidad.ancla}
            style={{ background: `${dataUnidad?.bghex}` }}
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
              <Container fluid>
                <Row noGutters>
                  <Col xs={12} md={6} className="align-self-center">
                    <div className="align-self-center content-tsd p-5 p-md-1 p-lg-1">
                      <h1
                        style={{ color: `${dataUnidad?.titulohex}` }}
                        dangerouslySetInnerHTML={content(
                          !!dataUnidad.unidadFuncional
                            ? `Piso ${dataUnidad.unidadFuncional.piso}`
                            : dataUnidad.titulo
                        )}
                      ></h1>
                      {!!dataUnidad.unidadFuncional ? (
                        <h4 style={{ color: `${dataUnidad?.subtitulohex}` }}>
                          {dataUnidad.unidadFuncional.name}
                        </h4>
                      ) : (
                        <h4
                          style={{ color: `${dataUnidad?.subtitulohex}` }}
                          dangerouslySetInnerHTML={content(
                            dataUnidad.subtitulo
                          )}
                        ></h4>
                      )}

                      {!!dataUnidad.unidadFuncional ? (
                        <p
                          style={{ color: `${dataUnidad?.descripcionhex}` }}
                          className="unidad-funcional"
                        >
                          {`DEPARTAMENTO ${dataUnidad.unidadFuncional.ambiente} `}
                          <ul>
                            {dataUnidad.unidadFuncional.metrosCubiertos !==
                            "NaN" ? (
                              <li>
                                {dataUnidad.unidadFuncional.metrosCubiertos !==
                                "NaN"
                                  ? `SUP. CUB ${dataUnidad.unidadFuncional.metrosCubiertos} M2`
                                  : ""}
                              </li>
                            ) : (
                              <></>
                            )}
                            {dataUnidad.unidadFuncional.metrosDescubiertos !==
                            "NaN" ? (
                              <li>
                                {dataUnidad.unidadFuncional
                                  .metrosDescubiertos !== "NaN"
                                  ? `SUP. DESC.CUB. ${dataUnidad.unidadFuncional.metrosDescubiertos} M2`
                                  : ""}
                              </li>
                            ) : (
                              <></>
                            )}
                            {dataUnidad.unidadFuncional.metrosSemiCubiertos !==
                            "NaN" ? (
                              <li>
                                {dataUnidad.unidadFuncional
                                  .metrosSemiCubiertos !== "NaN"
                                  ? `SUP. SEMI CUB ${dataUnidad.unidadFuncional.metrosSemiCubiertos} M2`
                                  : ""}
                              </li>
                            ) : (
                              <></>
                            )}
                            {dataUnidad.unidadFuncional.metrosAmenities !==
                            "NaN" ? (
                              <li>
                                {dataUnidad.unidadFuncional.metrosAmenities !==
                                "NaN"
                                  ? `Amenities. ${dataUnidad.unidadFuncional.metrosAmenities} M2`
                                  : ""}
                              </li>
                            ) : (
                              <></>
                            )}
                            {dataUnidad.unidadFuncional
                              .metrosCuadradosTotales !== "NaN" ? (
                              <li>
                                {dataUnidad.unidadFuncional
                                  .metrosCuadradosTotales !== "NaN"
                                  ? `Totales. ${dataUnidad.unidadFuncional.metrosCuadradosTotales} M2`
                                  : ""}
                              </li>
                            ) : (
                              <></>
                            )}
                          </ul>
                            {` ${dataUnidad.contraFrenteName1} CONTRAFRENTE `}
                          <ul>
                            {datosContrafrente1.[0] !== '' ? <li>{datosContrafrente1.[0] !== '' ? `${datosContrafrente1.[0]} ` : ''}</li> : <></>}
                            {datosContrafrente1.[1] !== '' ? <li>{datosContrafrente1.[1] !== '' ? `${datosContrafrente1.[1]} ` : ''}</li> : <></>}
                            {datosContrafrente1.[2] !== '' ? <li>{datosContrafrente1.[2] !== '' ? `${datosContrafrente1.[2]} ` : ''}</li> : <></>}
                            {datosContrafrente1.[3] !== '' ? <li>{datosContrafrente1.[3] !== '' ? `${datosContrafrente1.[3]} ` : ''}</li> : <></>}
                          </ul>
                        </p>
                      ) : (
                        <>
                          <DescriptionSection descripcion={dataUnidad.descripcion} descripcionalign="" descripcionhex={dataUnidad.descripcionhex}/>
                          <DescriptionSection descripcion={dataUnidad.descripcion2} descripcionalign={dataUnidad.descripcionalign} descripcionhex={dataUnidad.descripcionhex}/>
                          <BulletSection bullet={dataUnidad.bullet} color={dataUnidad.descripcionhex}/>
                        </>
                      )}
                    </div>
                  </Col>
                  <Col
                    md={{
                      span: 6,
                      order: data.align === "left" ? "first" : "last",
                    }}
                    ref={el}
                    style={{ background: `${dataUnidad?.bghex}` }}
                  >
                    <ImageMapper
                      onClick={(area) => clicked(area)}
                      onMouseEnter={(area) => enterArea(area)}
                      onMouseLeave={(area) => leaveArea(area)}
                      src={data[0].urlImagen}
                      map={unidad}
                      width={width}
                      imgWidth={width}
                    />

                    <ReactBnbGallery
                      show={isOpen}
                      photos={PHOTOS}
                      onClose={() => setIsOpen(false)}
                    />
                  </Col>
                </Row>
              </Container>
            </motion.div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className={`${data.ocultar === true ? "d-none" : ""} map-unidad ${
              dataUnidad.background === "black" ? "dark" : ""
            } text-${dataUnidad.textoalineacion}`}
            id={dataUnidad.ancla}
            style={{ background: `${dataUnidad?.bghex}` }}
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
              <Container fluid className={`p-0`}>
                <Row noGutters>
                <Col xs={12} md={6} className="align-self-center">
                    <div className="align-self-center p-5 p-md-1 p-lg-1">
                      <h1 style={{ color: `${dataUnidad?.titulohex}` }}
                        dangerouslySetInnerHTML={content(dataUnidad.titulo)}/>

                      <h4 style={{ color: `${dataUnidad?.subtitulohex}` }}
                          dangerouslySetInnerHTML={content(dataUnidad.subtitulo)}/>

                      <DescriptionSection descripcion={dataUnidad.descripcion} descripcionalign="" descripcionhex={dataUnidad?.descripcionhex}/>
                      <DescriptionSection descripcion={dataUnidad.descripcion2} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
                      <BulletSection bullet={data.bullet} color={data?.descripcionhex}/>
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="wrap-image text-right">
                      <Image
                        className="w-100 h-100 img-fluid d-inline-block"
                        src={data[0].urlImagen}
                        useMap="#image-map"
                        id="image-map"
                      />
                      <div className="grilla">
                        <Row>
                          {unidad.areas.map((e, i) => {
                            return (
                              <Col className="grilla-mobile" key={i} xs={3}>
                                <div
                                  onClick={() => {
                                    clicked(e);
                                  }}
                                  className="box"
                                >
                                  {e.data.unidadFuncional.name}
                                </div>
                              </Col>
                            );
                          })}
                        </Row>
                      </div>
                    </div>
                    <ReactBnbGallery
                      show={isOpen}
                      photos={PHOTOS}
                      onClose={() => setIsOpen(false)}
                    />
                  </Col>
                </Row>
              </Container>
            </motion.div>
          </div>
        </>
      );
    }
  };
  return renderContent();
};

export default MapaUnidadSection;
