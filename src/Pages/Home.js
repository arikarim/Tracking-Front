import React, { useEffect } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { BsFillPeopleFill } from 'react-icons/bs';
import Progress from '../components/Progress';
import final from '../PureFunctions/date';
import dateHandle from '../PureFunctions/time';

const Home = () => {
  const measures = useSelector((state) => state.measure);
  const [progress, setProgress] = React.useState(0);
  const measurments = useSelector((state) => state.measurments);
  const getProgress = () => {
    if (measurments[0]) {
      const res = measurments[0].filter(
        (item) => dateHandle(item.date, final) > 31,
      );
      const sum = res.reduce((acc, item) => acc + item.number, 0);
      setProgress(sum / res.length);
    }
  };

  useEffect(() => {
    getProgress();
    // eslint-disable-next-line
  }, []);

  const toke = JSON.parse(localStorage.getItem('token'));
  const valid = JSON.parse(localStorage.getItem('valid'));
  if (!toke || valid === 'invalid') {
    return <Redirect to="/login" />;
  }
  return (
    <Container className="cont">
      <Progress number={progress} time="last month" />
      <Col className="d-flex flex-wrap">
        {measures[0]
          && measures[0].map((measure) => (
            <Link
              className="my-auto px-2 col-6 text-decoration-none link-dark"
              key={measure.id}
              to={`/${measure.name}/${measure.id}`}
            >
              <Card className="my-2">
                <Card.Body className="d-flex justify-content-between">
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    <BsFillPeopleFill className="fs-5" />
                  </Card.Text>
                  <div className="my-auto text-decoration-none link-dark d-flex">
                    <div className="my-auto mx-2">{measure.name}</div>
                    <div className="my-auto mx-2">
                      {measurments[0]
                        && (
                          (measurments[0].filter(
                            (d) => d.measure_id === measure.id,
                          ).length
                            * 100)
                          / measurments[0].length
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
