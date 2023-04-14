import React  from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function getBulletList(bullet) {
    return bullet.split(';');
}

const BulletSection = (data) => {
    return (
        <div className="bullet">
            {!!data.bullet && data.bullet !== "" ? 
                ( 
                    <>
                        { getBulletList(data.bullet).map((item) => {
                                return (
                                    <ul style={{color: `${data?.color}`}}>
                                        <FontAwesomeIcon icon={faCircle} />
                                        <li style={{color: `${data?.color}`}} > {item} </li>
                                    </ul>
                                );
                            }) 
                        }
                    </>
                ) : 
                (<></>)
            }
        </div>
    )
}

export default BulletSection;