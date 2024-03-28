/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Tab,
  Tabs,
  Modal,
  Button,
  ToastContainer,
  Toast,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Uploader } from 'uploader'; // Installed by "react-uploader".
import { UploadButton } from 'react-uploader';

import { Loader } from '../../../components';
import {
  addCar,
  getAllCars,
  updateCar,
} from '../../../features/cars/carsSlice';
import {
  addFoto,
  removeFoto,
  getAllFotos,
  selectFoto,
} from '../../../features/fotos/fotosSlice';

import { SERVER_URL } from '../../../utils/constants';
import Field from '../Field';
import { Wrap } from './styles';

const EditViatura = () => {
  // Initialize once (at the start of your app).
  const uploader = Uploader({
    apiKey: 'free', // Get production API keys from Bytescale
  });
  // Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
  const options = { multi: true };

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const carFotos = useSelector((state) => state.fotos.fotos);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const [car, setCar] = useState(null);
  const [fotos, setFotos] = useState(carFotos || []);
  const [banner, setBanner] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: car });

  const fields = [
    {
      label: 'Ano',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'ano',
      placeholder: 'Ano',
      value: car?.ano,
      type: 'text',
    },
    {
      label: 'KMS',
      icon: 'fa-solid fa-road',
      nameId: 'kms',
      placeholder: 'KMS',
      value: car?.kms,
      type: 'number',
    },
    {
      label: 'Motor',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'motor',
      placeholder: 'Motor',
      value: car?.motor,
      type: 'text',
    },
    {
      label: 'CO2',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'co2',
      placeholder: 'CO2',
      value: car?.co2,
      type: 'number',
    },
    {
      label: 'Caixa',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'caixa',
      placeholder: 'Caixa',
      value: car?.caixa,
      type: 'text',
    },
    {
      label: 'Combustível',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'combustivel',
      placeholder: 'Combustível',
      value: car?.combustivel,
      type: 'text',
    },
    {
      label: 'Tipo',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'tipo',
      placeholder: 'Tipo',
      value: car?.tipo,
      type: 'text',
    },
    {
      label: 'Lugares',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'lugares',
      placeholder: 'Lugares',
      value: car?.lugares,
      type: 'number',
    },
    {
      label: 'Portas',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'portas',
      placeholder: 'Portas',
      value: car?.portas,
      type: 'number',
    },
    {
      label: 'Cor',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'cor',
      placeholder: 'Cor',
      value: car?.cor,
      type: 'text',
    },
    {
      label: 'Estado',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'estado',
      placeholder: 'Estado',
      value: car?.estado,
      type: 'text',
    },
    {
      label: 'Origem',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'origem',
      placeholder: 'Origem',
      value: car?.origem,
      type: 'text',
    },
    {
      label: 'Garantia',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'garantia',
      placeholder: 'Garantia',
      value: car?.garantia,
      type: 'text',
    },
    {
      label: 'Preço',
      icon: 'fa-solid fa-calendar-days',
      nameId: 'preco',
      placeholder: 'Preço',
      value: car?.preco,
      type: 'text',
    },
  ];

  const onSubmit = handleSubmit(async (car) => {
    if (id) {
      dispatch(updateCar({ id: id, car: car }))
        .then(() => navigate('/admin'))
        .catch((error) => console.error(error));
    } else {
      dispatch(addCar({ ...car, fotos: [] }))
        .then(() => navigate('/admin'))
        .catch((error) => console.error(error));
    }
  });

  const onSubmitFotos = (photos) => {
    setSaving(true);
    if (id) {
      dispatch(
        addFoto({
          id: id,
          fotos: photos,
        })
      )
        .then(() => navigate('/admin'))
        .catch((error) => console.error(error));
    } else {
      dispatch(addCar(fotos));
      navigate('/admin');
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFoto({ id }))
      .then(() => setShowToast(true))
      .then(() => setFotos((fotos) => fotos.filter((foto) => foto.id != id)));
    setShowModal(0);
  };

  const handleSelectFoto = (id) => {
    setBanner(id);
    dispatch(selectFoto({ id }));
  };

  useEffect(() => {
    if (cars.length) {
      setCar(cars.filter((car) => car.id == id)[0]);
    }
  }, [cars, id, dispatch]);

  useEffect(() => {
    if (id) {
      setBanner(fotos.filter((foto) => foto.banner == '1')?.[0]?.id);
    }
  }, [fotos]);

  useEffect(() => {
    if (cars.length < 1) {
      dispatch(getAllCars());
    }

    if (id) {
      dispatch(getAllFotos(id)).then(({ payload }) => {
        setFotos(payload);
      });
    }
  }, []);

  return (
    <Wrap className='container'>
      <Tabs
        defaultActiveKey='dados'
        id='uncontrolled-tab-example'
        className='col-sm-12'
      >
        <Tab eventKey='dados' title='Dados da viatura'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <div className='form-input'>
                <span>{errors.marca ? 'Marca is required.' : 'Marca'}</span>
                <input
                  className='form-control'
                  type='text'
                  {...register('marca')}
                  id='marca'
                  placeholder='Marca'
                />
              </div>
              <div className='form-input'>
                <span>{errors.modelo ? 'Modelo is required.' : 'Modelo'}</span>
                <input
                  className='form-control'
                  type='text'
                  {...register('modelo')}
                  id='modelo'
                  placeholder='Modelo'
                />
              </div>
            </div>
            <div className='input-fields'>
              {fields.map((field, index) => (
                <Field
                  register={register(field.nameId)}
                  {...field}
                  key={index}
                />
              ))}
            </div>
            <div className='form-buttons gap-2'>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => navigate('/admin')}
              >
                Voltar
              </button>
              <button
                type='button'
                className='btn btn-success'
                onClick={onSubmit}
              >
                Guardar
              </button>
            </div>
          </form>
        </Tab>

        <Tab eventKey='profile' title='Fotos'>
          <div className='form-group' style={{ backgroundColor: '#eee' }}>
            <div className='form-input' style={{ padding: '20px' }}>
              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={(files) =>
                  onSubmitFotos(files.map((file) => file.originalFile.file))
                }
              >
                {({ onClick }) => (
                  <button onClick={onClick}>Adicione fotos...</button>
                )}
              </UploadButton>
            </div>
          </div>

          <div className='form-group' style={{ backgroundColor: '#eee' }}>
            <p className='col-12'>
              Selecione a foto a ser destacada no banner.
            </p>
            {fotos?.map((foto, i) => (
              <div
                key={i}
                className={`foto col-12 col-md-4 ${
                  banner == foto.id ? 'selected' : ''
                }`}
              >
                <FontAwesomeIcon
                  className='hand-pointer delete-icon'
                  icon='fa-solid fa-trash'
                  onClick={() => setShowModal(foto.id)}
                />
                <div
                  style={{
                    backgroundImage: `url("${SERVER_URL}/imagens/${foto.fileName}")`,
                  }}
                  onClick={() => handleSelectFoto(foto.id)}
                ></div>
              </div>
            ))}
          </div>
          <div className='form-buttons gap-2'>
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => navigate('/admin')}
            >
              Voltar
            </button>

            <button
              type='button'
              className='btn btn-success'
              onClick={onSubmitFotos}
              disabled={saving}
            >
              Guardar mudanças
            </button>
          </div>
        </Tab>
      </Tabs>

      <ToastContainer position='bottom-center'>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg='success'
        >
          <Toast.Body>Foto removida com sucesso!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={!!showModal} onHide={() => setShowModal(0)}>
        <Modal.Body>Quer mesmo remover esta foto?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(0)}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={() => handleRemove(showModal)}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>

      {saving && (
        <div className='cover'>
          <Loader />
        </div>
      )}
    </Wrap>
  );
};

export default EditViatura;
