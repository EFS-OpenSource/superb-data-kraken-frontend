import { Container, Row, Spinner } from 'react-bootstrap';

const LoadingIndicator = () => (
  <Container fluid className="vh-100 d-flex align-items-center">
    <Row className="justify-content-center w-100">
      <Spinner animation="border" variant="primary" />
    </Row>
  </Container>
);

export default LoadingIndicator;
