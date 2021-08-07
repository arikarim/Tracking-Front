import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import final from "../PureFunctions/date";
import dateHandle from "../PureFunctions/time";

const Measurments = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = history.location.pathname.split("/")[2];
  const name = history.location.pathname.split("/")[1];
  const fetchData = async () => {
    try {
      const data = await axios.get("http://localhost:3001/measurments");
      const res = data.data.filter(
        (d) => d.user_id === user.id && d.measure_id === Number(id)
      );
      // console.log(res);
      setData(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container className="cont">
      <h1 className="mx-auto text-center">Measurments</h1>
      <Col>
        <h5>Today:</h5>
        {data &&
          data
            .filter((item) => dateHandle(item.date, final) < 29)
            .map((m) => (
              <Link
                className="my-auto text-decoration-none"
                key={m.id}
                to={`/${name}/show/${m.id}`}
              >
                <Card className="my-2">
                  <Card.Body className="d-flex justify-content-between">
                    <Card.Text className="my-auto text-decoration-none link-dark">
                      {name}
                    </Card.Text>
                    <Card.Text className="my-auto text-decoration-none link-dark">
                      {m.number}
                    </Card.Text>
                    <Card.Text className="my-auto text-decoration-none link-dark">
                      {m.date}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
        <h5>Yesterday</h5>
        {data &&
          data
            .filter(
              (item) =>
                dateHandle(item.date, final) > 29 &&
                dateHandle(item.date, final) < 31
            )
            .map((m) => (
              <Link
                className="my-auto text-decoration-none"
                key={m.id}
                to={`/${name}/show/${m.id}`}
              >
                <Card className="my-2">
                  <Card.Body className="d-flex justify-content-between">
                    <Card.Text className="my-auto text-decoration-none link-dark">
                      {name}
                    </Card.Text>
                    <Card.Text className="my-auto text-decoration-none link-dark">
                      {m.number}
                    </Card.Text>
                    <Card.Text className="my-auto text-decoration-none link-dark">
                      {m.date}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
        <h5>Last week and before</h5>
        {data &&
          data
            .filter((item) => dateHandle(item.date, final) > 30)
            .map((m) => (
              <Link
                className="my-auto text-decoration-none"
                key={m.id}
                to={`/${name}/show/${m.id}`}
              >
                <Card className="my-2">
                  <Card.Body className="d-flex justify-content-between">
                    <Card.Text className="my-auto text-decoration-none link-dark">
                      {name}
                    </Card.Text>
                    <Card.Text className="my-auto text-decoration-none link-dark">
                      {m.number}
                    </Card.Text>
                    <Card.Text className="my-auto text-decoration-none link-dark">
                      {m.date}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
      </Col>
    </Container>
  );
};

export default Measurments;
