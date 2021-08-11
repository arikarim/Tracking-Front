import moment from 'moment';
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Progress from '../components/Progress';

const Measurments = () => {
  const [today, setToday] = useState([]);
  const [yesterday, setYesterday] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const { id, name } = useParams();

  const [progress, setProgress] = React.useState(0);
  const measurments = useSelector((state) => state.measurments);
  const now = moment(new Date());
  const fetchData = async () => {
    if (measurments[0] !== undefined) {
      try {
        const res = await measurments[0].filter(
          (d) => d.user_id === user.id && d.measure_id === Number(id),
        );
        const sum = res.reduce((acc, item) => acc + item.number, 0);
        setProgress((sum / res.length).toFixed(2));
        setToday(
          res.filter(
            (item) => Number(
              moment
                .duration(now.diff(moment(item.created_at).format('L')))
                .asDays(),
            ) < 1,
          ),
        );
        setYesterday(
          res.filter(
            (item) => Number(
              moment
                .duration(now.diff(moment(item.created_at).format('L')))
                .asDays()
                .toFixed(0),
            ) > 1
              && Number(
                moment
                  .duration(now.diff(moment(item.created_at).format('L')))
                  .asDays()
                  .toFixed(0),
              ) < 2,
          ),
        );
        setLastWeek(
          res.filter(
            (item) => Number(
              moment.duration(now.diff(item.created_at)).asDays().toFixed(0),
            ) > 2,
          ),
        );
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [measurments]);

  const toke = JSON.parse(localStorage.getItem('token'));
  const valid = JSON.parse(localStorage.getItem('valid'));
  if (!toke || valid === 'invalid') {
    return <Redirect to="/login" />;
  }
  return (
    <Container className="cont">
      <h1 className="mx-auto text-center">Measurments</h1>
      <Progress number={Number(progress)} time={name} />
      <Col>
        {today.length > 0 && <h5>Today:</h5>}
        {today.length > 0
          && today.map((m) => (
            <Link
              className="my-auto text-decoration-none"
              key={m.id}
              to={`/${name}/show/${m.id}`}
            >
              <Card className="my-2">
                <Card.Body className="d-flex justify-content-between">
                  <CircularProgress variant="determinate" value={m.number} />
                  <Moment className="text-dark" format="LL">
                    {m.created_at}
                  </Moment>
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    {m.number}
                    {' '}
                    Interviews
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        {yesterday.length > 0 && <h5>Yesterday</h5>}
        {yesterday.length > 0
          && yesterday.map((m) => (
            <Link
              className="my-auto text-decoration-none"
              key={m.id}
              to={`/${name}/show/${m.id}`}
            >
              <Card className="my-2">
                <Card.Body className="d-flex justify-content-between">
                  <CircularProgress variant="determinate" value={m.number} />
                  <Moment className="text-dark" format="LL">
                    {m.created_at}
                  </Moment>
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    {m.number}
                    {' '}
                    Interviews
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        {lastWeek.length > 0 && <h5>Last week and before</h5>}
        {lastWeek.length > 0
          && lastWeek.map((m) => (
            <Link
              className="my-auto text-decoration-none"
              key={m.id}
              to={`/${name}/show/${m.id}`}
            >
              <Card className="my-2">
                <Card.Body className="d-flex justify-content-between">
                  <CircularProgress variant="determinate" value={m.number} />
                  <Moment className="text-dark" format="LL">
                    {m.created_at}
                  </Moment>
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    {m.number}
                    {' '}
                    {name.charAt(0).toUpperCase() + name.slice(1)}
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
