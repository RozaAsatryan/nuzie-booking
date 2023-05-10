import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '/1.png';
const Footer = () => {
  return (
    <>
      <Container className="footer text-white text-center" fluid>
        <Row>
          <Col md={{ span: 4, offset: 2 }}>
            <img width="200px" height="90px" src={logo} className="mb-5 mt-3" />
            <p className="text-uppercase lead" style={{ fontSize: '12px' }}>
              © www.nuzie.am | All rights reserved
            </p>
          </Col>
          <Col
            md={4}
            className="footer__contacts d-flex flex-column justify-content-center align-items-center"
          >
            <p className="fs-5 text-uppercase lead">Contacts</p>
            <ul
              className="d-flex flex-column justify-content-start align-items-start"
              style={{ fontSize: '15px' }}
            >
              <li>Email: info@nuzie.com</li>
              <li>Telephone: +374-60-00-00-00</li>
              <li>Instagram: @nuzie_booking</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
