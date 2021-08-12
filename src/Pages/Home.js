import React, { useEffect } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { BsCodeSlash, BsFillPeopleFill } from 'react-icons/bs';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GoProject } from 'react-icons/go';
import { RiArticleFill, RiShoppingBagFill } from 'react-icons/ri';
import Progress from '../components/Progress';

const Home = () => {
  const measures = useSelector((state) => state.measure);
  const [progress, setProgress] = React.useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const measurments = useSelector((state) => state.measurments);
  const getProgress = () => {
    if (measurments[0]) {
      const res = measurments[0].filter(
        (d) => d.user_id === user.id,
      );
      const sum = res.reduce((acc, item) => acc + item.number, 0);
      setProgress(sum / res.length);
    }
  };
  const dependency = measurments[0]
    ? measurments[0].reduce((acc, item) => acc + item.number, 0) : 0;

  useEffect(() => {
    getProgress();
    // eslint-disable-next-line
  }, [dependency]);

  const toke = JSON.parse(localStorage.getItem('token'));
  const valid = JSON.parse(localStorage.getItem('valid'));
  if (!toke || valid === 'invalid') {
    return <Redirect to="/login" />;
  }
  return (
    <Container fluid className="cont">
      <Progress number={progress === null ? 0 : progress.toFixed(2)} time="last month" />
      <Col className="d-flex flex-wrap">
        {measures[0]
          && (
            <Link
              className="my-auto px-2 col-6 text-decoration-none link-dark"
              key={measures[0][0].id}
              to={`/${measures[0][0].name}/${measures[0][0].id}`}
            >
              <Card className="my-2 home-cards">
                <Card.Body className="d-flex px-0 justify-content-between">
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    <AiOutlineTwitter className="fs-1" />
                  </Card.Text>
                  <div className="my-auto text-decoration-none d-flex flex-column link-dark d-flex">
                    <div className="my-auto mx-2">{measures[0][0].name}</div>
                    <div className="my-auto mx-2">
                      {measurments[0]
                        && (
                          (measurments[0].filter(
                            (d) => d.user_id === user.id,
                          )
                            .filter(
                              (d) => d.measure_id === measures[0][0].id,
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
          )}
        {measures[0]
          && (
            <Link
              className="my-auto px-2 col-6 text-decoration-none link-dark"
              key={measures[0][1].id}
              to={`/${measures[0][1].name}/${measures[0][1].id}`}
            >
              <Card className="my-2 home-cards">
                <Card.Body className="d-flex justify-content-between">
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    <BsCodeSlash className="fs-1" />
                  </Card.Text>
                  <div className="my-auto text-decoration-none d-flex flex-column link-dark d-flex">
                    <div className="my-auto mx-2">{measures[0][1].name}</div>
                    <div className="my-auto mx-2">
                      {measurments[0]
                        && (
                          (measurments[0].filter(
                            (d) => d.user_id === user.id,
                          )
                            .filter(
                              (d) => d.measure_id === measures[0][1].id,
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
          )}
        {measures[0]
          && (
            <Link
              className="my-auto px-2 col-6 text-decoration-none link-dark"
              key={measures[0][2].id}
              to={`/${measures[0][2].name}/${measures[0][2].id}`}
            >
              <Card className="my-2 home-cards">
                <Card.Body className="d-flex justify-content-between">
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    <BsFillPeopleFill className="fs-1" />
                  </Card.Text>
                  <div className="my-auto text-decoration-none d-flex flex-column link-dark d-flex">
                    <div className="my-auto mx-2">{measures[0][2].name}</div>
                    <div className="my-auto mx-2">
                      {measurments[0]
                        && (
                          (measurments[0].filter(
                            (d) => d.user_id === user.id,
                          )
                            .filter(
                              (d) => d.measure_id === measures[0][2].id,
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
          )}

        {measures[0]
          && (
            <Link
              className="my-auto px-2 col-6 text-decoration-none link-dark"
              key={measures[0][3].id}
              to={`/${measures[0][3].name}/${measures[0][3].id}`}
            >
              <Card className="my-2 home-cards">
                <Card.Body className="d-flex justify-content-between">
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    <GoProject className="fs-1" />
                  </Card.Text>
                  <div className="my-auto text-decoration-none d-flex flex-column link-dark d-flex">
                    <div className="my-auto mx-2">{measures[0][3].name}</div>
                    <div className="my-auto mx-2">
                      {measurments[0]
                        && (
                          (measurments[0].filter(
                            (d) => d.user_id === user.id,
                          )
                            .filter(
                              (d) => d.measure_id === measures[0][3].id,
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
          )}

        {measures[0]
          && (
            <Link
              className="my-auto px-2 col-6 text-decoration-none link-dark"
              key={measures[0][4].id}
              to={`/${measures[0][4].name}/${measures[0][4].id}`}
            >
              <Card className="my-2 home-cards">
                <Card.Body className="d-flex justify-content-between">
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    <RiArticleFill className="fs-1" />
                  </Card.Text>
                  <div className="my-auto text-decoration-none d-flex flex-column link-dark d-flex">
                    <div className="my-auto mx-2">{measures[0][4].name}</div>
                    <div className="my-auto mx-2">
                      {measurments[0]
                        && (
                          (measurments[0].filter(
                            (d) => d.user_id === user.id,
                          )
                            .filter(
                              (d) => d.measure_id === measures[0][4].id,
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
          )}

        {measures[0]
          && (
            <Link
              className="my-auto px-2 col-6 text-decoration-none link-dark"
              key={measures[0][5].id}
              to={`/${measures[0][5].name}/${measures[0][5].id}`}
            >
              <Card className="my-2 home-cards">
                <Card.Body className="d-flex justify-content-between">
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    <RiShoppingBagFill className="fs-1" />
                  </Card.Text>
                  <div className="my-auto text-decoration-none d-flex flex-column link-dark d-flex">
                    <div className="my-auto mx-2">{measures[0][5].name}</div>
                    <div className="my-auto mx-2">
                      {measurments[0]
                        && (
                          (measurments[0].filter(
                            (d) => d.user_id === user.id,
                          )
                            .filter(
                              (d) => d.measure_id === measures[0][5].id,
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
          )}
      </Col>
    </Container>
  );
};

export default Home;
