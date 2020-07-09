const convertISODate = date => {
  const newDate = new Date(date).toDateString().slice(4);
  if (+newDate[4] === 0)
    return `${newDate.slice(0, 4)}${newDate[5]}, ${newDate.slice(7)}`;
  return `${newDate.slice(0, 6)}, ${newDate.slice(7)}`;
};

export default convertISODate;
