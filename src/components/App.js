import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Routes from '../Routes/Routes';
import createUser from '../Actions/user';
import { createMeasure, createMeasurments } from '../Actions/measure';

function App() {
  const [user, setUser] = useState(null);
  const toke = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch();

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
        localStorage.setItem('valid', JSON.stringify('valid'));
      } catch (e) {
        localStorage.setItem('valid', JSON.stringify('invalid'));
        const alert = document.querySelector('.alert');
        alert.classList.remove('d-none');
        alert.classList.add('d-block');
        alert.innerHTML = 'Server problem';
        setTimeout(() => {
          alert.classList.add('d-none');
          alert.classList.remove('d-block');
        }, 3000);
      }
    }
  };

  const fetchMeasure = async () => {
    if (toke !== '') {
      try {
        const data = await axios.get('https://cryptic-falls-25172.herokuapp.com/measures');
        dispatch(createMeasure(data.data));
      } catch (e) {
        const alert = document.querySelector('.alert');
        alert.classList.remove('d-none');
        alert.classList.add('d-block');
        alert.innerHTML = 'Server problem';
        setTimeout(() => {
          alert.classList.add('d-none');
          alert.classList.remove('d-block');
        }, 3000);
      }
    }
  };

  const fetchMeasurments = async () => {
    if (toke !== '') {
      try {
        const data = await axios.get('https://cryptic-falls-25172.herokuapp.com/measurments');
        dispatch(createMeasurments(data.data));
      } catch (e) {
        const alert = document.querySelector('.alert');
        alert.classList.remove('d-none');
        alert.classList.add('d-block');
        alert.innerHTML = 'Server problem';
        setTimeout(() => {
          alert.classList.add('d-none');
          alert.classList.remove('d-block');
        }, 3000);
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
  }, [toke, user]);
  return (
    <>
      <Routes rerun={fetchMeasurments} user={user} setUser={setUser} />
    </>
  );
}

export default App;
