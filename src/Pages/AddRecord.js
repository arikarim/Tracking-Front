import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

const AddRecord = () => {
  const [number, setNumber] = useState(null);
  const [measure_id, setMeasure_id] = useState(null);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const measures = useSelector((state) => state.measure);
  const measurments = useSelector((state) => state.measurments);

  useEffect(() => {}, []);
  const toke = JSON.parse(localStorage.getItem('token'));
  const valid = JSON.parse(localStorage.getItem('valid'));
  if (!toke || valid === 'invalid') {
    return <Redirect to="/login" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const ids = [];
    const dates = [];
    const items = measurments[0].filter(
      (item) => item.measure_id === Number(measure_id),
    );
    // eslint-disable-next-line
    items.map((item) => {
      ids.push(item.measure_id);
      dates.push(moment(item.created_at).format('L'));
    });

    if (
      ids.includes(Number(measure_id))
      && dates.includes(moment(new Date()).format('L'))
    ) {
      console.log('error');
    } else {
      const measurment = {
        measure_id,
        number,
        user_id: user.id,
        date: new Date(Date.now()).toLocaleString().split(',')[0],
      };
      try {
        await axios.post('http://localhost:3001/measurments', {
          measurment,
        });
        history.push('/');
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Form className="cont" onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Number</Form.Label>
        <Form.Control
          onChange={(e) => setNumber(e.target.value)}
          type="number"
          placeholder="Enter Number"
          required
        />
      </Form.Group>
      <Form.Select
        onChange={(e) => setMeasure_id(Number(e.target.value))}
        required
      >
        <option>Choose one</option>
        {measures[0]
          && measures[0].map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </Form.Select>

      <button className="btn btn-dark w-100 my-3" type="submit">
        Submit
      </button>
    </Form>
  );
};

export default AddRecord;
