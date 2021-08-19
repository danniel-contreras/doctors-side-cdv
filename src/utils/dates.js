export const returnDateNow = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month < 10 ? `${year}-0${month}-${day}` : `${year}-${month}-${day}`;
};

export const formatDate = (date) => {
  var d2 = new Date();
  return d2.setTime(date);
};
