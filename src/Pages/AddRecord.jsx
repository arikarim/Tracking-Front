import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
import final from "../PureFunctions/date";

const AddRecord = () => {
  const [measurments, setMeasurments] = useState([]);
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(null);
  const [measure_id, setMeasure_id] = useState(null);
  const history = useHistory();
  const toke = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetchData();
    fetchMeasurments();
  }, []);

  const fetchData = async () => {
    try {
      const data = await axios.get("http://localhost:3001/measures");
      // console.log(data.data);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMeasurments = async () => {
    try {
      const data = await axios.get("http://localhost:3001/measurments");
      setMeasurments(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let ids = [];
    let dates = [];
    const items = measurments.filter(
      (item) => item.measure_id === Number(measure_id)
    );
    items.map((item) => {
      ids.push(item.measure_id);
      dates.push(item.date);
    });
    console.log(new Date(Date.now()).toLocaleString().split(",")[0]);

    console.log(final);
    if (ids.includes(Number(measure_id)) && dates.includes(final)) {
      console.log("error");
      return;
    } else {
      const measurment = {
        measure_id: measure_id,
        number: number,
        user_id: user.id,
        date: new Date(Date.now()).toLocaleString().split(",")[0],
      };
      try {
        const data = await axios.post("http://localhost:3001/measurments", {
          measurment,
        });
        history.push("/");
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
        {data &&
          data.map((item) => (
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
