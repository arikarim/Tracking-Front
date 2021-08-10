import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import final from "../PureFunctions/date";
import dateHandle from "../PureFunctions/time";

const Measurments = () => {
  const [today, setToday] = useState([]);
  const [yesterday, setYesterday] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { id, name } = useParams();
  const measurments = useSelector((state) => state.measurments);

  const fetchData = async () => {
    if (measurments[0] !== undefined) {
      try {
        const res = await measurments[0].filter(
          (d) => d.user_id === user.id && d.measure_id === Number(id)
        );
        setToday(res.filter((item) => dateHandle(item.date, final) < 29));
        setYesterday(
          res.filter(
            (item) =>
              dateHandle(item.date, final) > 29 &&
              dateHandle(item.date, final) <= 31
          )
        );
        setLastWeek(res.filter((item) => dateHandle(item.date, final) > 31));
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measurments]);

  const toke = JSON.parse(localStorage.getItem("token"));
  const valid = JSON.parse(localStorage.getItem("valid"));
  if (!toke || valid === "invalid") {
    return <Redirect to={"/login"} />;
  }
  return (
    <Container className="cont">
      <h1 className="mx-auto text-center">Measurments</h1>
      <Col>
        {today.length > 0 && <h5>Today:</h5>}
        {today.length > 0 &&
          today.map((m) => (
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
        {yesterday.length > 0 && <h5>Yesterday</h5>}
        {yesterday.length > 0 &&
          yesterday.map((m) => (
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
        {lastWeek.length > 0 && <h5>Last week and before</h5>}
        {lastWeek.length > 0 &&
          lastWeek.map((m) => (
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
