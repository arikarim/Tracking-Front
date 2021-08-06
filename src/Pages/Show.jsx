import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Show = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { name } = useParams();

  const fetchData = async () => {
    try {
      const data = await axios.get(`http://localhost:3001/measurments/${id}`);
      console.log(data.data);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <Col>
        <h1 className="text-center">{name}</h1>
        {data && (
          <Link
            className="my-auto text-decoration-none"
            key={data.id}
            to={`/${data.name}/edit/${data.id}`}
          >
            <Card>
              <Card.Body className="d-flex justify-content-between">
                <Card.Text className="my-auto text-decoration-none link-dark">
                  {name}
                </Card.Text>
                <Card.Text className="my-auto text-decoration-none link-dark">
                  {data.number}
                </Card.Text>
                <Card.Text className="my-auto text-decoration-none link-dark">
                  {data.date}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        )}
      </Col>
    </Container>
  );
};

export default Show;
