import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Form, Toast, ToastContainer } from 'react-bootstrap';

import {
  updateSettings,
  getAllSettings,
} from '../../../features/settings/settingsSlice';
import { Loader, Input } from '../../../components';
import { Wrap } from './styles';

const Oficina = () => {
  const dispatch = useDispatch();
  const { settings, isLoading } = useSelector((state) => state.settings);
  const [setting, setSetting] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSetting({
      ...setting,
      [e.target.name]: value,
    });
  };

  const onSubmit = () => {
    delete setting.option;
    dispatch(updateSettings({ ...setting, id: setting.id })).then(() =>
      setShowToast(true)
    );
  };

  useEffect(() => {
    if (!setting && settings.length > 0) {
      const setting = settings.filter(
        (setting) => setting.option == 'oficina'
      )[0];
      setSetting(setting);
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
            Oficina atualizada com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Settings - Oficina</h1>
          <Form className='col-12' as={Row}>
            <Input
              className='col-12'
              label='Texto'
              as='textarea'
              rows={3}
              onChange={handleChange}
              name='about'
              defaultValue={setting?.about}
            />
            <Input
              className='col-lg-6'
              label='Morada'
              type='email'
              onChange={handleChange}
              name='morada1'
              defaultValue={setting?.morada1}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Contacto'
              onChange={handleChange}
              name='contacto1'
              defaultValue={setting?.contacto1}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Horário'
              onChange={handleChange}
              name='horario1'
              defaultValue={setting?.horario1}
            />

            <div className='form-buttons'>
              <button
                type='submit'
                className='btn btn-success'
                onClick={onSubmit}
              >
                Guardar
              </button>
            </div>
          </Form>
        </>
      )}
    </Wrap>
  );
};

export default Oficina;
