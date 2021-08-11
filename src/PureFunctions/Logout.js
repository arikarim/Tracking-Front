import axios from 'axios';

const logout = async (history) => {
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
    history.push('/login');
    const alert = document.querySelector('.alert');
    alert.classList.remove('d-none');
    alert.classList.add('d-block');
    alert.innerHTML = 'You are logged out';
    setTimeout(() => {
      alert.classList.add('d-none');
      alert.classList.remove('d-block');
    }, 3000);
  } catch (error) {
    const alert = document.querySelector('.alert');
    alert.classList.remove('d-none');
    alert.classList.add('d-block');
    alert.innerHTML = 'Something wenr wrong';
    setTimeout(() => {
      alert.classList.add('d-none');
      alert.classList.remove('d-block');
    }, 3000);
  }
};

export default logout;
