import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Home = () => {
  const userr = useSelector((state) => state.user);
  const measures = useSelector((state) => state.measure);
  const measurments = useSelector((state) => state.measurments);
  useEffect(() => {}, []);

  const toke = JSON.parse(localStorage.getItem("token"));
  const valid = JSON.parse(localStorage.getItem("valid"));
  if (!toke || valid === "invalid") {
    return <Redirect to={"/login"} />;
  }
  return (
    <Container className="cont">
      <Col>
        {measures[0] &&
          measures[0].map((measure) => (
            <Link
              className="my-auto text-decoration-none link-dark"
              key={measure.id}
              to={`/${measure.name}/${measure.id}`}
            >
              <Card className="my-2">
                <Card.Body className="d-flex justify-content-between">
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    {measure.name}
                  </Card.Text>
                  <div className="my-auto text-decoration-none link-dark d-flex">
                    <div className="my-auto mx-2">Rate</div>
                    <div className="my-auto mx-2">
                      {measurments[0] &&
                        (
                          (measurments[0].filter(
                            (d) => d.measure_id === measure.id
                          ).length *
                            100) /
                          measurments[0].length
                        ).toFixed(2)}
                      %
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          ))}
      </Col>
    </Container>
  );
};

export default Home;
