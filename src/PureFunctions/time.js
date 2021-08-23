const dateHandle = (date, final) => {
  const date1 = new Date(date);
  const date2 = new Date(final);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
export default dateHandle;
