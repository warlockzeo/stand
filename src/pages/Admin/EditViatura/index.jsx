/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useRef } from 'react';
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
  const inputFileRef = useRef();
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
  const [fileError, setFileError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: car });

  const fields = [
    {
      label: 'Registo',
      nameId: 'registo',
      placeholder: 'Registo',
      value: car?.registo,
      type: 'text',
    },
    {
      label: 'Quilometros',
      nameId: 'quilometros',
      placeholder: 'Quilometros',
      value: car?.quilometros,
      type: 'number',
    },
    {
      label: 'Lugares',
      nameId: 'lugares',
      placeholder: 'Lugares',
      value: car?.lugares,
      type: 'number',
    },
    {
      label: 'Segmento',
      nameId: 'segmento',
      placeholder: 'Segmento',
      value: car?.segmento,
      type: 'text',
    },
    {
      label: 'Combustível',
      nameId: 'combustivel',
      placeholder: 'Combustível',
      value: car?.combustivel,
      type: 'text',
    },
    {
      label: 'Potencia',
      nameId: 'potencia',
      placeholder: 'Potencia',
      value: car?.potencia,
      type: 'number',
    },
    {
      label: 'Cilindrada',
      nameId: 'cilindrada',
      placeholder: 'Cilindrada',
      value: car?.cilindrada,
      type: 'number',
    },
    {
      label: 'Transmissao',
      nameId: 'transmissao',
      placeholder: 'Transmissao',
      value: car?.transmissao,
      type: 'text',
    },
    {
      label: 'Cor',
      nameId: 'cor',
      placeholder: 'Cor',
      value: car?.cor,
      type: 'text',
    },
    {
      label: 'Portas',
      nameId: 'portas',
      placeholder: 'Portas',
      value: car?.portas,
      type: 'number',
    },
    {
      label: 'Estado',
      nameId: 'estado',
      placeholder: 'Estado',
      value: car?.estado,
      type: 'text',
    },
    {
      label: 'Garantia',
      nameId: 'garantia',
      placeholder: 'Garantia',
      value: car?.garantia,
      type: 'text',
    },
    {
      label: 'Preço',
      nameId: 'preco',
      placeholder: 'Preço',
      value: car?.preco,
      type: 'text',
    },
    {
      label: 'Observacoes',
      nameId: 'observacoes',
      placeholder: 'Observacoes',
      value: car?.observacoes,
      type: 'multitext',
    },
  ];

  const onSubmit = handleSubmit(async (car) => {
    delete car.fileName;
    if (id) {
      dispatch(updateCar({ id: id, car: car }))
        .then(() => navigate('/admin'))
        .catch((error) => console.error(error));
    } else {
      dispatch(addCar({ ...car }))
        .then(() => navigate('/admin'))
        .catch((error) => console.error(error));
    }
  });

  const onSubmitFotos = (photos) => {
    if (Array.isArray(photos)) {
      const fotosToSend = photos?.filter((file) => file.size <= 2097152);
      setSaving(true);

      if (id && fotosToSend.length) {
        dispatch(
          addFoto({
            id: id,
            fotos: fotosToSend,
          })
        )
          .then(() => {
            if (
              photos.length !== fotosToSend.length ||
              fotosToSend.length == 0
            ) {
              setFileError(true);
            } else {
              setFileError(false);
              navigate('/admin');
            }
          })
          .catch((error) => console.error(error));
      } else {
        setFileError(true);
        setSaving(false);
      }
    } else {
      navigate('/admin');
    }
  };

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpdateClick = (e) => {
    preventDefaults(e);
    if (!inputFileRef || !inputFileRef.current) return;
    inputFileRef.current.click();
  };

  const handleUpload = (files) => {
    const fotoFiles = [...files].map((file) => file);

    if (fotoFiles.length) {
      onSubmitFotos(fotoFiles);
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFoto({ id }))
      .then(() => setShowToast(true))
      .then(() => setFotos((fotos) => fotos.filter((foto) => foto.id != id)));
    setShowModal(0);
  };

  const handleSelectFoto = (id) => {
    setBanner((currentBanner) => (currentBanner == id ? null : id));
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

  if (saving) {
    return (
      <div className='cover-blur'>
        <Loader />
      </div>
    );
  }

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
          <div
            className='form-group'
            style={{
              backgroundColor: '#000',
              borderWidth: 10,
              borderStyle: 'solid',
              borderColor: '#eee',
              padding: '20px',
            }}
            onDragEnd={preventDefaults}
            onDragOver={preventDefaults}
            onDrop={(e) => {
              preventDefaults(e);
              handleUpload(e.dataTransfer.files);
            }}
          >
            <input
              hidden
              multiple
              name='fotos'
              type='file'
              accept='image/jpeg'
              ref={inputFileRef}
              onChange={(e) => {
                preventDefaults(e);
                handleUpload(e.target.files);
              }}
            />
            <span className='hand-pointer' onClick={handleUpdateClick}>
              Arraste as suas fotos ou clique aqui
            </span>
          </div>

          {fotos.length > 0 && (
            <div className='form-group' style={{ backgroundColor: '#000' }}>
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
          )}
          <div
            className='form-buttons gap-2'
            style={{ border: 'solid 20px #eee' }}
          >
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

      <ToastContainer position='bottom-center'>
        <Toast
          onClose={() => {
            setFileError(false);
          }}
          show={fileError}
          delay={5000}
          autohide
          bg='danger'
        >
          <Toast.Body>
            Desculpe! Uma ou mais fotos excede o limite de 2Mb por ficheiro e
            não será carregada.
          </Toast.Body>
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
    </Wrap>
  );
};

export default EditViatura;
