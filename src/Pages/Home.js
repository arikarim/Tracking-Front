import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [measurments, setMeasurments] = useState([]);

  useEffect(() => {
    fetchData();
    fetchMeasurments();
  }, []);

  const fetchData = async () => {
    try {
      const data = await axios.get("http://localhost:3001/measures");
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
  const toke = JSON.parse(localStorage.getItem("token"));
  const valid = JSON.parse(localStorage.getItem("valid"));
  if (!toke || valid === "invalid") {
    return <Redirect to={"/login"} />;
  }
  return (
    <Container className="cont">
      <Col>
        {data &&
          data.map((measure) => (
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
                      {measurments &&
                        (
                          (measurments.filter(
                            (d) => d.measure_id === measure.id
                          ).length *
                            100) /
                          measurments.length
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
