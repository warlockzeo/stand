import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Header } from '../components';
import Routes from '../routes/routes';

import { getAllSettings } from '../features/settings/settingsSlice';

const Site = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSettings());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
};

export default Site;
