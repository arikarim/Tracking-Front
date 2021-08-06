import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";

const AddRecord = () => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(null);
  const [measure_id, setMeasure_id] = useState("");
  const history = useHistory();
  const toke = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await axios.get("http://localhost:3001/measures");
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmit = async (e) => {
    const measurment = {
      measure_id: measure_id,
      number: number,
      user_id: user.id,
      date: new Date(Date.now()).toLocaleString().split(",")[0],
    };
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:3001/measurments", {
        measurment,
      });
      history.push("/");
    } catch (e) {
      console.log(e);
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
      <Form.Select onChange={(e) => setMeasure_id(e.target.value)} required>
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
