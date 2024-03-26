import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Form } from 'react-bootstrap';

import {
  getAllSettings,
  updateSettings,
} from '../../../features/settings/settingsSlice';
import { Loader, Input } from '../../../components';
import { Wrap } from './styles';

const Settings = () => {
  const dispatch = useDispatch();
  const { settings, isLoading } = useSelector((state) => state.settings);
  const [data, setData] = useState(settings?.[0]);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const onSubmit = () => dispatch(updateSettings(data));

  useEffect(() => {
    if (!data && settings.length > 0) {
      setData(settings[0]);
      dispatch(getAllSettings());
    }
  }, [settings, dispatch]);

  return (
    <Wrap className='container' isLoading={isLoading}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Settings</h1>
          <Form className='col-12' as={Row}>
            <Input
              className='col-12'
              label='About'
              as='textarea'
              rows={3}
              onChange={handleChange}
              name='about'
              defaultValue={settings?.[0]?.about}
            />
            <Input
              className='col-lg-6'
              label='Morada1'
              type='email'
              onChange={handleChange}
              name='morada1'
              defaultValue={settings?.[0]?.morada1}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Contacto1'
              onChange={handleChange}
              name='contacto1'
              defaultValue={settings?.[0]?.contacto1}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Horário1'
              onChange={handleChange}
              name='horario1'
              defaultValue={settings?.[0]?.horario1}
            />
            <Input
              className='col-lg-6'
              label='Morada2'
              onChange={handleChange}
              name='morada2'
              defaultValue={settings?.[0]?.morada2}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Contacto2'
              onChange={handleChange}
              name='contacto2'
              defaultValue={settings?.[0]?.contacto2}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Horário2'
              onChange={handleChange}
              name='horario2'
              defaultValue={settings?.[0]?.horario2}
            />
            <Input
              className='col-lg-6'
              label='Morada3'
              onChange={handleChange}
              name='morada3'
              defaultValue={settings?.[0]?.morada3}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Contacto3'
              onChange={handleChange}
              name='contacto3'
              defaultValue={settings?.[0]?.contacto3}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Horário3'
              onChange={handleChange}
              name='horario3'
              defaultValue={settings?.[0]?.horario3}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='E-mail'
              onChange={handleChange}
              name='email'
              defaultValue={settings?.[0]?.email}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Facebook'
              onChange={handleChange}
              name='facebook'
              defaultValue={settings?.[0]?.facebook}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Instagram'
              onChange={handleChange}
              name='instagram'
              defaultValue={settings?.[0]?.instagram}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Youtube'
              onChange={handleChange}
              name='youtube'
              defaultValue={settings?.[0]?.youtube}
            />
            <div className='form-buttons'>
              <button
                type='submit'
                className='btn btn-success'
                onClick={onSubmit}
              >
                Guardar Settings
              </button>
            </div>
          </Form>
        </>
      )}
    </Wrap>
  );
};

export default Settings;
