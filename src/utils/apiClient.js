import axios from 'axios';

import { SERVER_URL } from './constants';

export const getAllCars = async () => {
  const response = await fetch(`${SERVER_URL}/cars`, {
    headers: { Accept: 'application/json' },
  }).then((response) => response.json());

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
    .then((response) => response.data)
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
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const removeFoto = async (id) => {
  return await axios({
    method: 'delete',
    responseType: 'json',
    url: `${SERVER_URL}/fotos/${id}`,
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const selectFoto = async (id) => {
  return await axios({
    method: 'patch',
    responseType: 'json',
    url: `${SERVER_URL}/fotos/${id}`,
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const getAllUsers = async () => {
  const response = await fetch(`${SERVER_URL}/users`, {
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());

  return response;
};

export const addUser = async (data) => {
  return await axios({
    method: 'post',
    responseType: 'json',
    url: `${SERVER_URL}/users/`,
    data: JSON.stringify({
      body: data,
    }),
  })
    .then((response) => response)
    .catch((err) => {
      console.error(err);
    });
};

export const removeUser = async (id) => {
  return await axios({
    method: 'delete',
    responseType: 'json',
    url: `${SERVER_URL}/users/${id}`,
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const updateUser = async (data) => {
  return await axios({
    method: 'patch',
    responseType: 'json',
    url: `${SERVER_URL}/users/${data.id}`,
    data: JSON.stringify({
      body: data,
    }),
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const getAllSettings = async () => {
  const response = await fetch(`${SERVER_URL}/settings/`, {
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());

  return response;
};

export const updateSettings = async (data) => {
  return await axios({
    method: 'patch',
    responseType: 'json',
    url: `${SERVER_URL}/settings/`,
    data: JSON.stringify({
      body: data,
    }),
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const getAllProducts = async () => {
  const response = await fetch(`${SERVER_URL}/products`, {
    headers: { Accept: 'application/json' },
  }).then((response) => response.json());

  return response;
};

export const addProduct = async (data) => {
  return await axios({
    method: 'post',
    responseType: 'json',
    url: `${SERVER_URL}/products/`,
    data: JSON.stringify({
      body: data,
    }),
  })
    .then((response) => response)
    .catch((err) => {
      console.error(err);
    });
};

export const removeProduct = async (id) => {
  return await axios({
    method: 'delete',
    responseType: 'json',
    url: `${SERVER_URL}/products/${id}`,
    data: JSON.stringify({
      body: '',
    }),
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const updateProduct = async (data) => {
  console.log(data);
  return await axios({
    method: 'patch',
    responseType: 'json',
    url: `${SERVER_URL}/products/${data.id}`,
    data: JSON.stringify({
      body: data.product,
    }),
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const getAllProductFotos = async (data) => {
  const response = await fetch(`${SERVER_URL}/productfotos/${data}`, {
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());
  return response;
};

export const addProductFotos = async (data) => {
  return await axios({
    method: 'post',
    responseType: 'json',
    url: `${SERVER_URL}/productfotos/`,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data,
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const removeProductFoto = async (id) => {
  return await axios({
    method: 'delete',
    responseType: 'json',
    url: `${SERVER_URL}/productfotos/${id}`,
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};

export const selectProductFoto = async (id) => {
  return await axios({
    method: 'patch',
    responseType: 'json',
    url: `${SERVER_URL}/productfotos/${id}`,
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
};
