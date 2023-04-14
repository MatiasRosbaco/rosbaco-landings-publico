import React from "react";
import "./index.css";
import { isMobile } from "react-device-detect";

const ImagenSection = ({ data }) => {
  return (
    <img id={data.ancla}
            style={{
              position: "relative",
                zIndex: "1",
              width: "100%",
              height: "100%",
              top: "0",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            //backgroundAttachment: 'absolute',
            }}
         src={isMobile ? data.urlImagenMobile : data.urlImagen}
        >
    </img>
  );
};

export default ImagenSection;
