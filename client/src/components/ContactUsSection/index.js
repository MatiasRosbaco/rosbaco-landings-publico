import React from 'react'
import "./index.css"
import whatsappIcon from './../../images/whatsapp.png'
import callIcon from './../../images/call.png'

function getPhone(phone) {
    return phone.replace(/ /g, "").replace('-', "")
}

function isValid(phone) {
    return !!phone && phone != ""
}

const ContactUs = (data) => {
    return (
        <> 
            <div class='floating'>
                {
                    isValid(data.call) ?
                    <a href={`tel:${getPhone(data.call)}`} id="do_call">
                        <img
                            src={callIcon}
                            className="d-inline-block align-top img-fluid"/>
                    </a> : 
                    <></>
                }
                {
                    isValid(data.whatsapp) ?
                    <a href={`https://api.whatsapp.com/send?phone=${getPhone(data.whatsapp)}`} target='_blank' id="send_whatsapp">
                        <img
                            src={whatsappIcon}
                            className="d-inline-block align-top img-fluid"/>
                    </a> : 
                    <></>
                }     
            </div>
        </>);
};

export default ContactUs;