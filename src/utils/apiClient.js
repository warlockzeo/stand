import axios from 'axios';

const SERVER_URL = `${process.env.REACT_APP_URLBASEAPI ?? '/api'}`;

export const getAllCars = async () => {
  const response = await fetch(`${SERVER_URL}/cars`, {
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());

  return response;
};

export const getCar = async (id) => {
  const response = await fetch(`${SERVER_URL}/cars/${id}`, {
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());

  return response;
};

export const addCar = async (data) => {
  return await axios({
    method: 'post',
    responseType: 'json',
    url: `${SERVER_URL}/cars/`,
    data: JSON.stringify({
      body: data,
    }),
  })
    .then((response) => response)
    .catch((err) => {
      console.error(err);
    });
};

export const removeCar = async (id) => {
  return await axios({
    method: 'delete',
    responseType: 'json',
    url: `${SERVER_URL}/cars/${id}`,
    data: JSON.stringify({
      body: '',
    }),
  })
    .then((response) => response)
    .catch((err) => {
      console.error(err);
    });
};
