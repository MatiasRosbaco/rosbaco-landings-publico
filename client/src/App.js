import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-gallery/styles/scss/image-gallery.scss";
import getData from "./api/GET.js";
import analytics_initializer from "./analytics/Initializer.js"

import Header from "./components/Header";
import ImagenSection from "./components/ImagenSection";
import SliderSection from "./components/SliderSection";
import VideoSection from "./components/VideoSection";
import TextoImagenSection from "./components/TextoImagenSection";
import TextoSection from "./components/TextoSection";
import GallerySection from "./components/GallerySection";
import MapaUnidadSection from "./components/MapaUnidadSection";
import MapSection from "./components/MapSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { isMobile } from "react-device-detect";
import ContactUs from "./components/ContactUsSection";
import Unidad360Section from "./components/Unidad360Section";

const App = () => {
  let landing = window.location.pathname.split("/")[1];
  let utms = window.location.search.substring(1);
  if (utms) {
    utms = JSON.parse(
      '{"' +
        decodeURI(utms)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  }

  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(false);
    getData(landing)
      .then((res) => {
        setData(res.data);
        setLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [landing]);

  // analytics_initializer('UA-218149109-1');  -- DEVELOP
  analytics_initializer('UA-208213452-1'); // -- PRODUCTION

  const renderContent = () => {
    if (landing !== "") {
      return (
        <div className={`${isMobile ? 'mobile' : 'desktop'} App`}>
          {load ? (
            <>
            <ContactUs whatsapp={data.whatsApp} call={data.telefono}/>
              {!!data.modulos && load
                ? data.modulos.map((component, i) => {
                    switch (component.recordType) {
                      case "MENU":
                        return (
                          <Header
                            key={i}
                            data={component.content}
                            logo={data.logo}
                          />
                        );
                      case "IMAGEN":
                        return (
                          <ImagenSection key={i} data={component.content[0]} />
                        );
                      case "SLIDER":
                        return (
                          <SliderSection key={i} data={component.content} />
                        );
                      case "VIDEO":
                        return (
                          <VideoSection key={i} data={component.content[0]} />
                        );
                      case "TEXTO":
                        return (
                          <TextoSection key={i} data={component.content[0]} />
                        );
                      case "TEXTO_IMAGEN":
                        return (
                          <TextoImagenSection
                            key={i}
                            data={component.content[0]}
                          />
                        );
                      case "TEXTO_SLIDER":
                        return (
                          <GallerySection key={i} data={component.content} />
                        );
                      case "MAPA_UNIDAD":
                        return (
                          <MapaUnidadSection key={i} data={component.content} />
                        );
                      case "MAPA_UBICACION":
                        return (
                          <MapSection key={i} data={component.content[0]} />
                        );
                      case "UNIDAD_360":
                        return (
                          <Unidad360Section key={i} data={component.content[0]} />
                        );
                      case "FORMULARIO":
                        return (
                          <ContactSection
                            key={i}
                            data={component.content[0]}
                            utms={utms}
                            landing={landing}
                            interes={data.proyectoInteres}
                          />
                        );
                      case "FOOTER":
                        return <Footer key={i} data={component.content[0]} />;
                      default:
                      // <></>
                    }
                  })
                : ""}
            </>
          ) : (
            <Loading></Loading>
          )}
        </div>
      );
    } else {
      return window.location = "http://www.rosbacopartners.com";
    }
    
  };
  return renderContent();
};
export default App;
