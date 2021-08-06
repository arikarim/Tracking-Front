import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useParams } from "react-router";

const MeasurmentEdit = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { name } = useParams();

  const fetchData = async () => {
    try {
      const data = await axios.get(`http://localhost:3001/measurments/${id}`);
      console.log(data.data);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <Col>
        <h1 className="text-center">{name}</h1>
        {data && (
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Number</Form.Label>
              <Form.Control
                defaultValue={data.number}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Col>
    </Container>
  );
};

export default MeasurmentEdit;
