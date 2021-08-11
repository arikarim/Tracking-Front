import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router';

const MeasurmentEdit = () => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(null);
  const history = useHistory();
  const { id } = useParams();
  const { name } = useParams();
  const measurments = useSelector((state) => state.measurments);

  const fetchData = async () => {
    if (measurments[0] !== undefined) {
      setData(measurments[0].filter((m) => m.id === Number(id))[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const measurment = {
      measure_id: data.measure_id,
      number,
      date: new Date(Date.now()).toLocaleString().split(',')[0],
    };
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/measurments/${id}`, {
        measurment,
      });
      history.push('/');
      const alert = document.querySelector('.alert');
      alert.classList.remove('d-none');
      alert.classList.add('d-block');
      alert.innerHTML = 'Record edited successfully';
      setTimeout(() => {
        alert.classList.add('d-none');
        alert.classList.remove('d-block');
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [measurments[0]]);
  const toke = JSON.parse(localStorage.getItem('token'));
  const valid = JSON.parse(localStorage.getItem('valid'));
  if (!toke || valid === 'invalid') {
    return <Redirect to="/login" />;
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
