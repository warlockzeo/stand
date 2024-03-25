import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader, Banner, SearchBar, About, Footer } from '../../components';
import LastReleases from '../../containers/lastReleases';
import { getAllCars } from '../../features/cars/carsSlice';

import { HomeStyled } from './styles';

const Home = () => {
  const dispatch = useDispatch();
  const { cars, isLoading } = useSelector((state) => state.cars);
  const { settings, isLoadingSettings } = useSelector(
    (state) => state.settings
  );
  const [carsFiltered, setCarsFiltered] = useState([]);
  const [filters, setFilters] = useState([]);

  const handleChangeFilter = (field, value) => {
    if (value) {
      setFilters([
        ...filters.filter((x) => x.field !== field),
        { field, value },
      ]);
    } else {
      setFilters(filters.filter((x) => x.field !== field));
    }
  };

  useEffect(() => {
    if (cars.length) {
      let newCars = cars;
      filters.forEach((filt) => {
        if (filt.field === 'preco') {
          newCars = newCars.filter(
            (car) => Number(car[filt.field]) >= Number(filt.value)
          );
        } else {
          newCars = newCars.filter((car) => car[filt.field] === filt.value);
        }
      });
      setCarsFiltered(newCars);
    }
  }, [cars, filters]);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    if (carsFiltered.length < 1 && filters.length === 0) {
      setCarsFiltered(cars);
    }
  }, [cars, carsFiltered, filters]);

  return (
    <HomeStyled>
      <Banner
        images={cars.filter((car) => car.fileName !== null)}
        expandeble={true}
      />
      <SearchBar list={cars} onChange={handleChangeFilter} />
      {isLoading ? <Loader /> : <LastReleases data={carsFiltered} />}
      <About />
      <Footer />
    </HomeStyled>
  );
};

export default Home;
