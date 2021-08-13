import React, { useEffect } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { BsCodeSlash, BsFillPeopleFill } from 'react-icons/bs';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GoProject } from 'react-icons/go';
import { RiArticleFill, RiShoppingBagFill } from 'react-icons/ri';
import Progress from '../components/Progress';

const Home = () => {
  const measures = useSelector((state) => state.measure);
  const [progress, setProgress] = React.useState(null);
  const history = useHistory();
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

  const icons = (n) => {
    switch (n) {
      case 1:
        return <AiOutlineTwitter className="fs-1" />;
      case 2:
        return <BsCodeSlash className="fs-1" />;
      case 3:
        return <BsFillPeopleFill className="fs-1" />;
      case 4:
        return <GoProject className="fs-1" />;
      case 5:
        return <RiArticleFill className="fs-1" />;
      case 6:
        return <RiShoppingBagFill className="fs-1" />;
      default:
        return <BsFillPeopleFill className="fs-1" />;
    }
  };

  const toke = JSON.parse(localStorage.getItem('token'));
  const valid = JSON.parse(localStorage.getItem('valid'));
  if (toke === '' || valid === 'invalid') {
    history.push('/login');
  }
  return (
    <Container fluid className="cont">
      <Progress number={progress === null ? 0 : progress.toFixed(2)} time="last month" />
      <Col className="d-flex flex-wrap">
        {measures[0]
          && measures[0].map((d) => (
            <Link
              className="my-auto px-2 col-6 text-decoration-none link-dark"
              key={d.id}
              to={`/${d.name}/${d.id}`}
            >
              <Card className="my-2 home-cards">
                <Card.Body className="d-flex px-0 justify-content-around">
                  <Card.Text className="my-auto text-decoration-none link-dark">
                    {icons(d.id)}
                  </Card.Text>
                  <div className="my-auto text-decoration-none d-flex flex-column link-dark d-flex">
                    <div className="my-auto mx-2">{d.name}</div>
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
          ))}
      </Col>
    </Container>
  );
};

export default Home;
