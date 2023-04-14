import React from "react";
import "./index.css";
import { isMobile } from "react-device-detect";

const VideoSection = ({ data }) => {
  const renderContent = () => {
      return (
            <video
              id={"video-bg"}
              autoPlay="autoplay"
              loop="loop"
              muted
              className={"video"}
              className={`${data.ocultar === true ? "d-none" : ""} vc`} id={data.ancla}
              style={{
                  width: "100%",
                  height: "100%",
                  top: "0",
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
              }}
            >
              <source src={data.urlImagen} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
      );
  };
  return renderContent();
};

export default VideoSection;
