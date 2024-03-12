import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { Uploader } from 'uploader'; // Installed by "react-uploader".
import { UploadButton } from 'react-uploader';

import { addCar, updateCar } from '../../../features/cars/carsSlice';
import { addFoto } from '../../../features/fotos/fotosSlice';

import Field from '../Field';
import { Wrap } from './styles';

const EditViatura = () => {
  const navigate = useNavigate();

  // Initialize once (at the start of your app).
  const uploader = Uploader({
    apiKey: 'free', // Get production API keys from Bytescale
  });
  // Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
  const options = { multi: true };

  const { id } = useParams();
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);

  const [car, setCar] = useState(null);
  const [fotos, setFotos] = useState(car?.fotos || []);

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

  const onSubmitFotos = () => {
    if (id) {
      dispatch(
        addFoto({ id: id, fotos: fotos.map((file) => file.originalFile.file) })
      )
        // .then(() => navigate('/admin'))
        .catch((error) => console.error(error));
    } else {
      dispatch(addCar(fotos));
      // navigate('/admin');
    }
  };

  useEffect(() => {
    if (cars) {
      setCar(cars.filter((car) => car.id === id)[0]);
    }
  }, [cars, id, dispatch]);

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
          <div className='form-group col-md-12'>
            <div className='form-input'>
              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={(files) =>
                  setFotos((prev) => [...prev, ...files.map((file) => file)])
                }
              >
                {({ onClick }) => (
                  <button onClick={onClick}>Selecione uma foto...</button>
                )}
              </UploadButton>
            </div>
          </div>
          <div className='form-group'>
            {fotos?.map((foto, i) => (
              <img
                src={foto.fileUrl}
                className='foto col-sm-12 col-md-4 col-lg-3'
                key={i}
                alt={i}
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
              onClick={onSubmitFotos}
            >
              Guardar Fotos
            </button>
          </div>
        </Tab>
      </Tabs>
    </Wrap>
  );
};

export default EditViatura;
