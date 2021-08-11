import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Routes from '../Routes/Routes';
import { createUser } from '../Actions/user';
import { createMeasure, createMeasurments } from '../Actions/measure';

function App() {
  const [user, setUser] = useState(null);
  const toke = JSON.parse(localStorage.getItem('token'));
  const userr = JSON.parse(localStorage.getItem('correctuser'));
  const dispatch = useDispatch();

  const fetchUser = async () => {
    if (toke !== '') {
      try {
        const data = await axios.get('http://localhost:3001/member', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: toke,
          },
        });
        localStorage.setItem('correctuser', JSON.stringify(data.data.user));
        dispatch(createUser(data.data.user));
        localStorage.setItem('valid', JSON.stringify('valid'));
      } catch (e) {
        localStorage.setItem('valid', JSON.stringify('invalid'));
        console.log(e);
      }
    }
  };

  const fetchMeasure = async () => {
    if (toke !== '') {
      try {
        const data = await axios.get('http://localhost:3001/measures');
        dispatch(createMeasure(data.data));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const fetchMeasurments = async () => {
    if (toke !== '') {
      try {
        const data = await axios.get('http://localhost:3001/measurments');
        dispatch(createMeasurments(data.data));
        console.log('Lets dee');
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    fetchMeasurments();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    fetchUser();
    fetchMeasure();
    // eslint-disable-next-line
  }, [toke, userr]);
  return (
    <>
      <Routes rerun={fetchMeasurments} user={user} setUser={setUser} />
    </>
  );
}

export default App;
