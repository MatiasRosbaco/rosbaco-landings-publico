import React  from "react";
import "./index.css";
import content from "../../utils/render.js";

const DescriptionSection = (data) => {
    return (
        <div className="description">
            {!!data.descripcion || data.descripcion !== "" ? (
                <p className={`text-${data.descripcionalign}`} style={{color: `${data.descripcionhex}`}} dangerouslySetInnerHTML={content(data.descripcion)}></p>
            ) : (
                <></>
            )}
        </div>
    )
}

export default DescriptionSection;