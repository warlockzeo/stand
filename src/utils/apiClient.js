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
