import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [data, setData] = useState([]);
  const [measurments, setMeasurments] = useState([]);
  const [correct, setCorrect] = useState(null);
  const toke = JSON.parse(localStorage.getItem("token"));

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

  if (toke === "") {
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
                  <Card.Text className="my-auto text-decoration-none link-dark d-flex">
                    <p className="my-auto mx-2">Rate</p>
                    <p className="my-auto mx-2">
                      {measurments &&
                        (measurments.filter((d) => d.measure_id == measure.id)
                          .length *
                          100) /
                          measurments.length}
                      %
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
      </Col>
    </Container>
  );
};

export default Home;
