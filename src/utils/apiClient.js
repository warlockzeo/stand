import axios from 'axios';

import { SERVER_URL } from './constants';

export const getAllCars = async () => {
  const response = await fetch(`${SERVER_URL}/cars`, {
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
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const updateCar = async (data) => {
  return await axios({
    method: 'patch',
    responseType: 'json',
    url: `${SERVER_URL}/cars/${data.id}`,
    data: JSON.stringify({
      body: data.car,
    }),
  })
    .then((response) => response)
    .catch((err) => {
      console.error(err);
    });
};

export const getAllFotos = async (data) => {
  const response = await fetch(`${SERVER_URL}/fotos/${data}`, {
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());

  return response;
};

export const addFotos = async (data) => {
  return await axios({
    method: 'post',
    responseType: 'json',
    url: `${SERVER_URL}/fotos/`,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data,
  })
    .then((response) => response)
    .catch((err) => {
      console.error(err);
    });
};

export const removeFoto = async (id) => {
  return await axios({
    method: 'delete',
    responseType: 'json',
    url: `${SERVER_URL}/fotos/${id}`,
    data: JSON.stringify({
      body: '',
    }),
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};
