import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import alertt from '../PureFunctions/alert';
import increment from '../Actions/count';

const AddRecord = () => {
  const [number, setNumber] = useState(null);
  const [measureId, setMeasureId] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
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
      (item) => item.measure_id === Number(measureId) && item.user_id === user.id,
    );
    // eslint-disable-next-line
    items.map((item) => {
      ids.push(item.measure_id);
      dates.push(moment(item.created_at).format('L'));
    });

    if (
      ids.includes(Number(measureId))
      && dates.includes(moment(new Date()).format('L'))
    ) {
      const alert = document.querySelector('.alert');
      alert.classList.remove('d-none');
      alert.classList.add('d-block');
      alert.innerHTML = 'Record for today already exists';
      setTimeout(() => {
        alert.classList.add('d-none');
        alert.classList.remove('d-block');
      }, 3000);
    } else {
      const now = moment(new Date());
      const measurment = {
        measure_id: measureId,
        number,
        user_id: user.id,
        date: now,
      };
      try {
        await axios.post('https://cryptic-falls-25172.herokuapp.com/measurments', {
          measurment,
        });
        dispatch(increment(count));
        history.push('/');
        alertt('Record created successfuly');
      } catch (e) {
        alertt('Server problem');
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
        onChange={(e) => setMeasureId(Number(e.target.value))}
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
