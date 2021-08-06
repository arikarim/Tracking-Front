import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";

const Show = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { name } = useParams();
  const history = useHistory();

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

  const onDelete = async () => {
    try {
      const data = await axios.delete(
        `http://localhost:3001/measurments/${id}`
      );
      history.push("/");
      setData([]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Col>
        <h1 className="text-center">{data.length > 0 && name}</h1>
        {data.length > 0 && (
          <div>
            <Link
              className="my-auto text-decoration-none"
              key={data.id}
              to={`/${data.name}/edit/${data.id}`}
            >
              <Card>
                <Card.Body className="d-flex justify-content-between">
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    {name}
                    {console.log(data)}
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
            <button onClick={onDelete} className="btn btn-danger w-100">
              Delete
            </button>
          </div>
        )}
      </Col>
    </Container>
  );
};

export default Show;