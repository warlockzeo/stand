/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Form, Toast, ToastContainer } from 'react-bootstrap';
import noImage from '../../../assets/no-image.png';
import {
  updateSettings,
  getAllSettings,
  addSettingsFotos,
} from '../../../features/settings/settingsSlice';
import { Loader, Input } from '../../../components';
import { Wrap } from './styles';

const Oficina = () => {
  const dispatch = useDispatch();
  const { settings, isLoading } = useSelector((state) => state.settings);
  const [setting, setSetting] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [photo1, setPhoto1] = useState([]);
  const [photo2, setPhoto2] = useState([]);

  console.log(photo1);
  const handleChange = (e) => {
    const value = e.target.value;
    setSetting({
      ...setting,
      [e.target.name]: value,
    });
  };

  const onSubmit = () => {
    const newSettings = {
      ...setting,
      id: setting.id,
    };
    const foto1 = photo1;
    const foto2 = photo2;
    delete newSettings.option;
    dispatch(updateSettings(newSettings)).then(() => setShowToast(true));
    dispatch(
      addSettingsFotos({
        id: setting.id,
        fotos: [...foto1, ...foto2],
      })
    ).then(() => setShowToast(true));
  };

  // const onSubmitFotos = (photos) => {
  //   if (Array.isArray(photos)) {
  //     const fotosToSend = photos?.filter((file) => file.size <= 2097152);
  //     setSaving(true);
  //     if (id) {
  //       dispatch(
  //         addFoto({
  //           id: id,
  //           fotos: fotosToSend,
  //         })
  //       )
  //         .then(() => {
  //           if (
  //             photos.length !== fotosToSend.length ||
  //             fotosToSend.length == 0
  //           ) {
  //             setFileError(true);
  //           } else {
  //             setFileError(false);
  //             navigate('/admin');
  //           }
  //         })
  //         .catch((error) => console.error(error));
  //     } else {
  //       dispatch(addCar(fotos));
  //       navigate('/admin');
  //     }
  //   } else {
  //     navigate('/admin');
  //   }
  // };

  useEffect(() => {
    if (!setting && settings.length > 0) {
      const setting = settings.filter(
        (setting) => setting.option == 'oficina'
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

            <div
              className='col-12 col-md-6'
              style={{
                padding: '20px',
                position: 'relative',
              }}
            >
              <input
                name='foto1'
                type='file'
                accept='image/jpeg'
                onChange={(files) => setPhoto1([...files.target.files])}
                className='hand-pointer'
                style={{
                  opacity: 0,
                  position: 'absolute',
                  width: '90%',
                  height: '90%',
                }}
              />
              <img
                src={photo1[0] ? URL.createObjectURL(photo1[0]) : noImage}
                alt=''
                style={{ width: '100%' }}
              />
              <br />
              <span>Foto 1 ...</span>
            </div>
            <div
              className='col-12 col-md-6'
              style={{
                padding: '20px',
                position: 'relative',
              }}
            >
              <input
                name='foto2'
                type='file'
                accept='image/jpeg'
                onChange={(files) => setPhoto2([...files.target.files])}
                className='hand-pointer'
                style={{
                  opacity: 0,
                  position: 'absolute',
                  width: '90%',
                  height: '90%',
                }}
              />
              <img
                src={photo2[0] ? URL.createObjectURL(photo2[0]) : noImage}
                alt=''
                style={{ width: '100%' }}
              />
              <br />
              <span>Foto 2 ...</span>
            </div>
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
