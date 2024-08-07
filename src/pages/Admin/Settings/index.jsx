import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Form, Toast, ToastContainer } from 'react-bootstrap';

import {
  updateSettings,
  getAllSettings,
} from '../../../features/settings/settingsSlice';
import { Loader, Input } from '../../../components';
import { Wrap } from './styles';

const Settings = () => {
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
        (setting) => setting.option === 'footer'
      )[0];
      setSetting(setting);
      dispatch(getAllSettings());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <h1>Settings - Footer</h1>
          <Form className='col-12' as={Row}>
            <Input
              className='col-12'
              label='About'
              as='textarea'
              rows={3}
              onChange={handleChange}
              name='about'
              defaultValue={setting?.about}
            />
            <Input
              className='col-lg-6'
              label='Morada1'
              type='email'
              onChange={handleChange}
              name='morada1'
              defaultValue={setting?.morada1}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Contacto1'
              onChange={handleChange}
              name='contacto1'
              defaultValue={setting?.contacto1}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Horário1'
              onChange={handleChange}
              name='horario1'
              defaultValue={setting?.horario1}
            />
            <Input
              className='col-lg-6'
              label='Morada2'
              onChange={handleChange}
              name='morada2'
              defaultValue={setting?.morada2}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Contacto2'
              onChange={handleChange}
              name='contacto2'
              defaultValue={setting?.contacto2}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Horário2'
              onChange={handleChange}
              name='horario2'
              defaultValue={setting?.horario2}
            />
            <Input
              className='col-lg-6'
              label='Morada3'
              onChange={handleChange}
              name='morada3'
              defaultValue={setting?.morada3}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Contacto3'
              onChange={handleChange}
              name='contacto3'
              defaultValue={setting?.contacto3}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Horário3'
              onChange={handleChange}
              name='horario3'
              defaultValue={setting?.horario3}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='E-mail'
              onChange={handleChange}
              name='email'
              defaultValue={setting?.email}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Facebook'
              onChange={handleChange}
              name='facebook'
              defaultValue={setting?.facebook}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Instagram'
              onChange={handleChange}
              name='instagram'
              defaultValue={setting?.instagram}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Youtube'
              onChange={handleChange}
              name='youtube'
              defaultValue={setting?.youtube}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='TikTok'
              onChange={handleChange}
              name='tiktok'
              defaultValue={setting?.tiktok}
            />
            <Input
              className='col-md-6 col-lg-3'
              label='Whatsapp'
              onChange={handleChange}
              name='whatsapp'
              defaultValue={setting?.whatsapp}
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

export default Settings;
