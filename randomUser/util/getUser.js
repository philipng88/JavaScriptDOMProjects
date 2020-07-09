// eslint-disable-next-line import/extensions
import convertISODate from './formatDate.js';

const getUser = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  const user = data.results[0];
  const {
    name: { first: firstName, last: lastName },
    email,
    dob: { date: birthday },
    location: {
      street: { number: streetNumber, name: streetName },
    },
    phone,
    login: { username },
    picture: { large: profilePic },
  } = user;
  return {
    name: `${firstName} ${lastName}`,
    email,
    birthday: convertISODate(birthday),
    address: `${streetNumber} ${streetName}`,
    phone,
    username,
    profilePic,
  };
};

export default getUser;
