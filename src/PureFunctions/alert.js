const alertt = (message) => {
  const alert = document.querySelector('.alert');
  alert.classList.remove('d-none');
  alert.classList.add('d-block');
  alert.innerHTML = message;
  setTimeout(() => {
    alert.classList.add('d-none');
    alert.classList.remove('d-block');
  }, 3000);
};

export default alertt;
