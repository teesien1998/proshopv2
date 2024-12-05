import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaExclamation } from "react-icons/fa";
import Meta from "../components/Meta";

const NotFoundScreen = () => {
  return (
    <>
      <Meta title="404 Not Found | Error" />
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row className="justify-content-md-center text-center">
        <Col md={6}>
          <FaExclamation className="fs-1 text-warning my-3" />
          <h1>404 Not Found</h1>
          <p>This page does not exist</p>
        </Col>
      </Row>
    </>
  );
};

export default NotFoundScreen;
