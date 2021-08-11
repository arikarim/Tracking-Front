import axios from 'axios';

const logout = async (setUser, history) => {
  try {
    const toke = JSON.parse(localStorage.getItem('token'));
    await axios.delete('http://localhost:3001/users/sign_out', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: toke,
      },
    });
    localStorage.setItem('token', JSON.stringify(''));
    localStorage.setItem('user', JSON.stringify([]));
    localStorage.setItem('valid', JSON.stringify('invalid'));
    setUser('Not Logged');
    history.push('/login');
  } catch (error) {
    console.log(error);
  }
};

export default logout;
