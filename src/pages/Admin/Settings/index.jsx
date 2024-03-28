import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Form, Toast, ToastContainer } from 'react-bootstrap';

import {
  getAllSettings,
  updateSettings,
} from '../../../features/settings/settingsSlice';
import { Loader, Input } from '../../../components';
import { Wrap } from './styles';

const Settings = () => {
  const dispatch = useDispatch();
  const { settings, isLoading } = useSelector((state) => state.settings);
  const [data, setData] = useState(settings);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const onSubmit = () =>
    dispatch(updateSettings(data)).then(() => setShowToast(true));

  useEffect(() => {
    if (!data && settings.length > 0) {
      setData(settings[0]);
      dispatch(getAllSettings());
    }
  }, [settings, dispatch]);

  return (
    <Wrap className='container' isLoading={isLoading}>
      <ToastContainer position='bottom-center'>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg='success'
        >
          <Toast.Body className='text-white'>
            Textos atualizados com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>
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
              defaultValue={settings?.about}
            />
            <Input
              className='col-lg-6'
              label='Morada1'
              type='email'
              onChange={handleChange}
              name='morada1'
              defaultValue={settings?.morada1}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Contacto1'
              onChange={handleChange}
              name='contacto1'
              defaultValue={settings?.contacto1}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Horário1'
              onChange={handleChange}
              name='horario1'
              defaultValue={settings?.horario1}
            />
            <Input
              className='col-lg-6'
              label='Morada2'
              onChange={handleChange}
              name='morada2'
              defaultValue={settings?.morada2}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Contacto2'
              onChange={handleChange}
              name='contacto2'
              defaultValue={settings?.contacto2}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Horário2'
              onChange={handleChange}
              name='horario2'
              defaultValue={settings?.horario2}
            />
            <Input
              className='col-lg-6'
              label='Morada3'
              onChange={handleChange}
              name='morada3'
              defaultValue={settings?.morada3}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Contacto3'
              onChange={handleChange}
              name='contacto3'
              defaultValue={settings?.contacto3}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Horário3'
              onChange={handleChange}
              name='horario3'
              defaultValue={settings?.horario3}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='E-mail'
              onChange={handleChange}
              name='email'
              defaultValue={settings?.email}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Facebook'
              onChange={handleChange}
              name='facebook'
              defaultValue={settings?.facebook}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Instagram'
              onChange={handleChange}
              name='instagram'
              defaultValue={settings?.instagram}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Youtube'
              onChange={handleChange}
              name='youtube'
              defaultValue={settings?.youtube}
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
