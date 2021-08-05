import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router";

const MeasurmentEdit = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const id = history.location.pathname.split("/")[3];
  const name = history.location.pathname.split("/")[1];

  const fetchData = async () => {
    try {
      const data = await axios.get(`http://localhost:3001/measurments/${id}`);
      console.log(data.data);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <Col>
        <h1 className="text-center">{name}</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Number</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default MeasurmentEdit;
