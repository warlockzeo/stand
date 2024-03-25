import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Wrap } from './styles';
import { getAllSettings } from '../../../features/settings/settingsSlice';
import { Loader } from '../../../components';

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settings, isLoading } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getAllSettings());
  }, [dispatch]);

  return (
    <Wrap className='container' isLoading={isLoading}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Settings</h1>
        </>
      )}
    </Wrap>
  );
};

export default Settings;
