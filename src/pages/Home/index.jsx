import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Banner, SearchBar, About, Footer } from '../../components';
import LastReleases from '../../containers/lastReleases';

import { HomeStyled } from './styles';

import { getAllCars } from '../../features/cars/carsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const carsState = useSelector((state) => state.cars);
  const carros = carsState?.cars || [];

  const handleChangeFilter = (val) => console.log(val);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <HomeStyled>
      <Banner data={carros} />
      <SearchBar onChange={handleChangeFilter} />
      <LastReleases data={carros} />
      <About />
      <Footer />
    </HomeStyled>
  );
};

export default Home;
