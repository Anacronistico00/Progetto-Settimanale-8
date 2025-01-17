import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container className='mt-3 py-2'>
        <Row>
          <Col>
            <p>
              <a href='#' alt='footer link' className='footerLinks'>
                Who we are
              </a>
            </p>
          </Col>
          <Col>
            <p>
              <a href='#' alt='footer link' className='footerLinks'>
                policies
              </a>
            </p>
          </Col>
          <Col>
            <p>
              <a href='#' alt='footer link' className='footerLinks'>
                Privacy
              </a>
            </p>
          </Col>
          <Col>
            <p>
              <a href='#' alt='footer link' className='footerLinks'>
                Contact us
              </a>
            </p>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={12} md={6} className='text-center footerInfo'>
            <p>DayaSky Copyright 2002-2025 DATASKY srl / Meteosolutions srl</p>
            <p>Iscrizione Registro delle imprese di Bergamo del 13/01/2017</p>
            <p> n. REA 242543254325 - PIVA 67457463646, CS 57.000€</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
