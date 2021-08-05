import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [data, setData] = useState([]);
  const toke = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetchData();
  }, []);
  if (toke === "") {
    return <Redirect to={"/login"} />;
  }

  const fetchData = async () => {
    try {
      const data = await axios.get("http://localhost:3001/measures");
      // console.log(data.data);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Col>
        {data &&
          data.map((measure) => (
            <Link key={measure.id} to={`/${measure.name}/${measure.id}`}>
              <Card className="my-2">
                <Card.Body>{measure.name}</Card.Body>
              </Card>
            </Link>
          ))}
      </Col>
    </Container>
  );
};

export default Home;
