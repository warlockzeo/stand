export const getAllCars = async () => {
  //const response = await fetch('api/cars');

  const response = await fetch('/data/data.json', {
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());

  return response;
};

export const getOneCar = async (id) => {
  //const response = await fetch('api/cars');

  const response = await fetch('/data/data.json', {
    headers: { Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((res) => res.filter((carro) => carro.id === id)[0]);

  return response;
};
