import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Redirect, useHistory, useParams } from "react-router";

const MeasurmentEdit = () => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(null);
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
      await axios.put(`http://localhost:3001/measurments/${id}`, {
        measurment,
      });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toke = JSON.parse(localStorage.getItem("token"));
  const valid = JSON.parse(localStorage.getItem("valid"));
  if (!toke || valid === "invalid") {
    return <Redirect to={"/login"} />;
  }
  return (
    <Container className="cont">
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
            <Button className="w-100 btn-info" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Col>
    </Container>
  );
};

export default MeasurmentEdit;
