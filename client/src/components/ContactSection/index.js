import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import logoRb from "../../images/rbpartner.png";
import logoWhiteRb from "../../images/rosbacowhite.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./index.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import { deviceDetect, isMobile, mobileModel , mobileVendor, osName, browserName} from "react-device-detect";
import { useIdleTimer } from "react-idle-timer";
import content from "../../utils/render.js";
import Loading from "../Loading";
import BulletSection from "../BulletSection/index";
import DescriptionSection from "../DescriptionSection/index";
import Events from "../../analytics/Events.js";

function getBackground(data) {
  // first image than color
}

function event_data(email, phone){
  var email_path = email.substring(0,email.indexOf("@"));
  var email_extension = email.substring(email.indexOf("@")+1,email.indexOf("."));

  return '"email_path": "'+email_path+'", "email_extension": "'+email_extension+'", "phone": "'+phone+'"';
}

function event_error_data(email, phone, error){
  var email_path = email.substring(0,email.indexOf("@"));
  var email_extension = email.substring(email.indexOf("@")+1,email.indexOf("."));

  return '"email_path": "'+email_path+'", "email_extension": "'+email_extension+'", "phone": "'+phone+'", "error": "'+error+'"';
}

const ContactSection = ({ data, utms, landing, interes }) => {
  const CATEGORY = 'ContactUs';
  const { getElapsedTime } = useIdleTimer();
  const [date, setDate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Hola, estoy interesado en el proyecto y me gustaria que me contacten."
  );
  const [toast, setToast] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [agente, setAgente] = useState(false);
  const [name, setName] = useState("");
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const clear = () => {
    setAgente(false);
    setMessage(
      "Hola, estoy interesado en el proyecto y me gustaria que me contacten."
    );
    setEmail("");
    setName("");
    setTel("");
  };
  const handleSubmit = (event) => {
    setLoading(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    event.persist();
    if (
      (form.checkValidity() !== false && email !== "") ||
      name !== "" ||
      message !== "" ||
      tel !== ""
    ) {
      Events(CATEGORY, 'Clicked Submit Successfully', event_data(email, tel));
      axios({
        url:
          //"http://localhost:8080/landing/lead",
          "https://rosbaco-backend.herokuapp.com/landing/lead",
        headers: { "content-type": "application/json"},
        method: "POST",
        data: Object.assign(
          {
            doNotCall: agente,
            email: email,
            fechaEntrevista: `${date !== null ? moment(date).format("L") : null}`,
            lastName: name,
            leadSource: landing,
            mensajeWeb: message,
            name: name,
            phone: tel,
            //preferenciaHorarioContactacion: "8 a 12",
            device: `${isMobile ? 'Mobile '+ mobileVendor + ' - ' + mobileModel + ' - ' + osName + ' - ' + browserName : 'Desktop ' + osName + ' - ' + browserName} `,
            elapsedTime: millisToMinutesAndSeconds(getElapsedTime()),
            proyectoInteresManual: interes,
          },
          utms
        ),
      })
        .then((res) => {
          setLoading(false);
          event.preventDefault();
          event.stopPropagation();
          setShow(true);
          setToast("Enviado");
          clear();
          form.reset();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          Events(CATEGORY, 'Clicked Submit But Empty Values', event_error_data(email, tel, err.message));
          setShow(true);
          setToast(err.message);
        });
    } else {
      Events(CATEGORY, 'Clicked Submit But Empty Values', event_data(email, tel));
      event.preventDefault();
      event.stopPropagation();
    }
    // setValidated(true);
  };

  const handleDateChange = (e) => {
    setDate(e);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleTelChange = (e) => {
    setTel(e.target.value);
  };
  const handleAgenteChange = (e) => {
    setAgente(e.target.checked);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  return (
    !loading ? (
    <div
      id={data.ancla}
      className={`${data.ocultar === true ? "d-none" : ""} contact-section text-${data.textoalineacion}`}
      style={{background: `${data?.bghex}`}}
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
        <Container className={`${isMobile ? "p-5" : "contact-container"}`}>
          <Row className="display-flex">
            <Col md={5}>
              <h1 style={{color: `${data?.titulohex}`}}>Solicita información</h1>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label style={{color: `${data?.titulohex}`}}>Nombre*</Form.Label>
                  <Form.Control
                    required
                    name="name"
                    value={name}
                    // size="lg"
                    type="text"
                    onChange={handleNameChange}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label style={{color: `${data?.titulohex}`}}>Email*</Form.Label>
                  <Form.Control
                    required
                    name="email"
                    value={email}
                    // size="lg"
                    type="email"
                    onChange={handleEmailChange}
                  />
                </Form.Group>
                <Form.Group controlId="tel">
                  <Form.Label style={{color: `${data?.titulohex}`}}>Teléfono*</Form.Label>
                  <Form.Control
                    required
                    name="tel"
                    value={tel}
                    // size="lg"
                    onChange={handleTelChange}
                    type="tel"
                  />
                </Form.Group>
                <Form.Group controlId="agente">
                  <Form.Check style={{color: `${data?.titulohex}`}}
                    label="Deseo que un agente se comunique conmigo"
                    name="agente"
                    id="agente"
                    onChange={handleAgenteChange}
                  />
                </Form.Group>
                {agente ? (
                  <Form.Group controlId="date">
                    <Form.Label style={{color: `${data?.titulohex}`}}>Seleccionar un día</Form.Label>
                    <DatePicker selected={date} onChange={handleDateChange} />
                  </Form.Group>
                ) : (
                  <></>
                )}
                <Form.Group controlId="message">
                  <Form.Label style={{color: `${data?.titulohex}`}}>Mensaje*</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows="3"
                    name="message"
                    value={message}
                    // size="lg"
                    onChange={handleMessageChange}
                  />
                </Form.Group>
                <Form.Group className="text-right">
                  <Button onclick="dataLayer.push({'event': 'formulario-landing-send'});"
                    disabled={
                      email.length === 0 ||
                      name.length === 0 ||
                      tel.length === 0 ||
                      message.length === 0
                    }
                    type="submit"
                  >
                    Enviar
                  </Button>
                </Form.Group>
              </Form>
              <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={5000}
                autohide
              >
                <Toast.Body>{toast}</Toast.Body>
              </Toast>
            </Col>

            <Col
              md={{ span: 7, order: data.align === "left" ? "first" : "last" }}
            >
              <div className={`${isMobile ? "" : "info"}`}>
                <Image
                  className="img-fluid"
                  src={data.background === "Black" ? logoWhiteRb : logoRb}
                ></Image>
                <div>
                  <h1 className={`text-${data.tituloalign}`} style={{color: `${data?.titulohex}`}} dangerouslySetInnerHTML={content(data.titulo)}></h1>
                  <h4 className={`text-${data.subtituloalign}`} style={{color: `${data?.subtitulohex}`}} dangerouslySetInnerHTML={content(data.subtitulo)}></h4>
                  <DescriptionSection descripcion={data.descripcion} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
                  <DescriptionSection descripcion={data.descripcion2} descripcionalign={data.descripcionalign} descripcionhex={data.descripcionhex}/>
                  <BulletSection bullet={data.bullet} color={data?.descripcionhex}/>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </div>
    ) : <Loading></Loading>
  );
};

export default ContactSection;
