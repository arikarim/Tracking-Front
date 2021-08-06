import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

const MeasurmentEdit = () => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(null);
  const [measure_id, setMeasure_id] = useState("");
  const history = useHistory();
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const measurment = {
      measure_id: data.measure_id,
      number: number,
      date: new Date(Date.now()).toLocaleString().split(",")[0],
    };
    e.preventDefault();
    try {
      const data = await axios.put(`http://localhost:3001/measurments/${id}`, {
        measurment,
      });
      history.push("/");
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
        {data && (
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                defaultValue={data.number}
                onChange={(e) => setNumber(e.target.value)}
                type="number"
                placeholder="Enter Number"
                required
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
