import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Moment from 'react-moment';
import Progress from '../components/Progress';

const Show = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { name } = useParams();
  const history = useHistory();
  const [progress, setProgress] = React.useState(0);

  const fetchData = async () => {
    try {
      const data = await axios.get(`http://localhost:3001/measurments/${id}`);
      setData(data.data);
      setProgress(data.data.number);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/measurments/${id}`);
      history.push('/');
      setData([]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container className="cont">
      <Progress number={progress} time="Today" />
      <Col>
        <h1 className="text-center">{data.id && name}</h1>
        {data.id && (
          <div>
            <Link
              className="my-auto text-decoration-none"
              key={data.id}
              to={`/${data.name}/edit/${data.id}`}
            >
              <Card>
                <Card.Body className="d-flex justify-content-between">
                  <CircularProgress variant="determinate" value={data.number} />
                  <Moment className="text-dark" format="LL">
                    {data.created_at}
                  </Moment>
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    {data.number}
                    {' '}
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
            <button type="button" onClick={onDelete} className="btn btn-danger my-3 w-100">
              Delete
            </button>
          </div>
        )}
      </Col>
    </Container>
  );
};

export default Show;
