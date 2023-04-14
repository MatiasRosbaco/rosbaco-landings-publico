import React, {useState, useEffect} from 'react'
import "./index.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import content from "../../utils/render.js";
import { isMobile } from "react-device-detect";
import Modal from 'react-bootstrap/Modal'
import BulletSection from "../BulletSection/index";
import DescriptionSection from "../DescriptionSection/index";
import exitIcon from './../../images/exit.png'
import logo360Off from "../../images/logo360Off.png";
import logo360On from "../../images/logo360On.png";

const Unidad360Section = ({ data }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      }, [controls, inView]);

    function over(e) {
        e.currentTarget.src =  logo360On ;
    }
    function out(e) {
        e.currentTarget.src =  logo360Off ;
    }

    return (
        <div
            id={data.ancla}
            className={`${data.ocultar === true ? "d-none" : ""} modulo-360`}
            style={{background: `${data?.bghex}`}}>
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
                className={`${isMobile ? "" : "content"}`} >
                <Container className={`${isMobile ? "mobile-content" : ""}`}>
                    <Row>
                {/*  <Col
                            md={4}
                            md={{
                                    span: data.align === "left" ? 5 : 4,
                                    offset: data.align === "left" ? 5 : 0,
                                    order: data.align === "left" ? "first" : "last",
                                }}  
                            className={`${isMobile ? "align-self-center mobile-text" : ""}`}>
                    
                        
                            <h1 className={`text-${data.tituloalign}`} style={{color: `${data.titulohex}`}} dangerouslySetInnerHTML={content(data.titulo)}></h1>
                            <h4 className={`text-${data.subtituloalign}`} style={{color: `${data.subtitulohex}`}} dangerouslySetInnerHTML={content(data.subtitulo)}></h4>
                            <DescriptionSection descripcion={data.descripcion} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
                            <DescriptionSection descripcion={data.descripcion2} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
                            <BulletSection bullet={data.bullet} color={data.descripcionhex}/>
                        </Col>*/}
                        <Col
                            md={8}
                            className={`${isMobile ? "mobile-content" : "text-center"}`}
                            md={{
                                order: data.align === "left" ? "first" : "last",
                            }}>
                            <div>
                                <Image
                                    className={`img-fluid ${isMobile ? 'mt-5' : ''}`}
                                    src={data.urlImagen}
                                    onClick={handleShow}
                                />
                                <img
                                   src={logo360Off}
                                   href={"#"}
                                   className={"img-360 img-360-mobile"}
                                     onMouseOver={over}
                                     onMouseOut={out}
                                   onClick={handleShow}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </motion.div>

            <>
                <Modal show={show} onHide={handleClose}>
                    <div class='exit-floating'>
                        <button onClick={handleClose}>
                            <img
                                src={exitIcon}
                                className="d-inline-block align-top img-fluid"/>
                        </button>
                    </div>
                    <iframe 
                        src={data.urlImagen360} 
                        frameborder="0" 
                        marginheight="0" 
                        marginwidth="0" 
                        width="100%" 
                        height="100%" 
                        scrolling="auto"/>
                </Modal>
            </>
        </div>
    )
}

export default Unidad360Section;