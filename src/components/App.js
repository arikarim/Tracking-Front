import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from '../Routes/Routes';
import createUser from '../Actions/user';
import { createMeasure, createMeasurments } from '../Actions/measure';
import alertt from '../PureFunctions/alert';

function App() {
  const [user, setUser] = useState(null);
  const toke = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch();
  const measurments = useSelector((state) => state.measurments);

  const fetchMeasure = async () => {
    if (toke !== '') {
      try {
        const data = await axios.get('https://cryptic-falls-25172.herokuapp.com/measures');
        dispatch(createMeasure(data.data));
      } catch (e) {
        alertt('Server problem');
      }
    }
  };

  const fetchMeasurments = async () => {
    if (toke !== '') {
      try {
        const data = await axios.get('https://cryptic-falls-25172.herokuapp.com/measurments');
        dispatch(createMeasurments(data.data));
      } catch (e) {
        alertt('Server problem');
      }
    }
  };
  fetchMeasurments();
  useEffect(() => {
    fetchMeasurments();
    // eslint-disable-next-line
  }, [measurments[0] && measurments[0].length]);

  useEffect(() => {
    fetchMeasure();
    // eslint-disable-next-line
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (toke !== '') {
        try {
          const data = await axios.get('https://cryptic-falls-25172.herokuapp.com/member', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: toke,
            },
          });
          localStorage.setItem('correctuser', JSON.stringify(data.data.user));
          dispatch(createUser(data.data.user));
          console.log(data.data.user);
          localStorage.setItem('valid', JSON.stringify('valid'));
        } catch (e) {
          localStorage.setItem('valid', JSON.stringify('invalid'));
          alertt('Server problem');
        }
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <Routes rerun={fetchMeasurments} user={user} setUser={setUser} />
    </>
  );
}

export default App;
