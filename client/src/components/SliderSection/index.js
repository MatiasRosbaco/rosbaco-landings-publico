import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import content from "../../utils/render.js";

// react-id-swiper
import "swiper/css/swiper.css";
import Swiper from "react-id-swiper";
import "./index.css";

const SliderSection = ({ data }) => {
  const SliderConfigs = {
    containerClass: "swiper-container slider-section",
    parallax: false,
    centeredSlides: true,
    speed: 500,
    spaceBetween: 0,
    effect: "slide",
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: false
    },
    disableOnInteraction: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };
  const [parallaxSwiper, setparallaxSwiper] = useState(null);
  //const parallaxAmount = parallaxSwiper ? parallaxSwiper.width * 0.95 : 0;
  //const parallaxOpacity = 0.5;
  return (
    <div id={data.[0].ancla}
         className={`${data.ocultar === true ? "d-none" : ""} ${isMobile? "mobile" : ""} main-contanier-slide`} >
      <Swiper {...SliderConfigs} getSwiper={setparallaxSwiper}>
        {!!data ? data.map((imagen, i) => {
          return (
            <div key={i} className={"main-slide"}>
              <div
                className={"slide-image"}
              >
                {isMobile ? (
                    <div className="image-item-slide" style={{backgroundImage:"url(" + imagen.urlImagenMobile + ")"}}></div>
                ) : (
                    <div className="image-item-slide" style={{backgroundImage:"url(" + imagen.urlImagen + ")"}}></div>
                )}
              </div>
              <Container>
                <Row className="h-100">
                  <Col md={{ span: 6, offset: 3 }} className="my-auto">
                    <Row noGutters>
                      <Col md={12}>
                        {!!imagen.titulo && imagen.titulo !== "" ? (
                          <h1
                            dangerouslySetInnerHTML={content(imagen.titulo)}
                          ></h1>
                        ) : (
                          <></>
                        )}
                        </Col>
                        <Col md={12}>
                        {!!imagen.subtitulo && imagen.subtitulo !== "" ? (
                          <h4
                            dangerouslySetInnerHTML={content(imagen.subtitulo)}
                          ></h4>
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </div>
          );
        }) : <></>}
      </Swiper>
    </div>
  );
};

export default SliderSection;
