import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ mdColSize = 6, children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={mdColSize}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
