import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button, Toast, ToastContainer, Form } from 'react-bootstrap';

import {
  getAllCars,
  removeCar,
  updateCar,
} from '../../features/cars/carsSlice';
import { Loader, Image } from '../../components';
import { Wrap, EmptyArray } from './styles';

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cars, isLoading } = useSelector((state) => state.cars);
  const [showModal, setShowModal] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleDelete = (id) => {
    dispatch(removeCar({ id })).then(() => setShowToast(true));
    setShowModal(0);
  };

  const handleClick = (carId) => navigate(`/admin/viaturas/${carId}`);

  const onChangeVendido = (id) => {
    const car = Object.assign({}, cars.filter((car) => car.id === id)[0]);
    delete car.fileName;

    const vendido = car.vendido == 1 ? 0 : 1;

    dispatch(updateCar({ id: id, car: { ...car, vendido: vendido } }))
      .then(() => dispatch(getAllCars()))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <Wrap className='container'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {cars?.length ? (
            <>
              <h1>Minhas viaturas</h1>
              <button
                type='button'
                className='btn btn-success'
                style={{ position: 'absolute', top: 0, right: 10 }}
                onClick={() => navigate(`/admin/viaturas/new`)}
              >
                <FontAwesomeIcon icon='fa-solid fa-plus' />
              </button>
              <table>
                <thead>
                  <tr>
                    <th>Banner</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Ano</th>
                    <th>Vendido</th>
                  </tr>
                </thead>
                <tbody>
                  {cars?.map((car, index) => (
                    <tr key={index}>
                      <td
                        className='hand-pointer text-center'
                        onClick={() => setShowModal(car.id)}
                      >
                        <Image
                          src={car?.fileName}
                          alt=''
                          style={{ with: '50px', height: '50px' }}
                        />
                      </td>
                      <td
                        className='hand-pointer'
                        onClick={() => handleClick(car.id)}
                      >
                        {car.marca}
                      </td>
                      <td
                        className='hand-pointer'
                        onClick={() => handleClick(car.id)}
                      >
                        {car.modelo}
                      </td>
                      <td
                        className='hand-pointer'
                        onClick={() => handleClick(car.id)}
                      >
                        {car.ano}
                      </td>
                      <td className='hand-pointer'>
                        <Form.Check
                          type='switch'
                          name='vendido'
                          label={car.vendido == 1 ? 'Sim' : 'Não'}
                          checked={car.vendido == 1 ? true : false}
                          onChange={() => onChangeVendido(car.id)}
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon='fa-solid fa-trash'
                          onClick={() => setShowModal(car.id)}
                          className='delete-icon hand-pointer'
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <EmptyArray>
              <h1>Nenhuma viatura encontrada.</h1>
              <Link to={`/admin/viaturas/new`}>
                <button className='btn btn-primary'>
                  Registrar sua primeira viatura
                </button>
              </Link>
            </EmptyArray>
          )}
        </>
      )}

      <ToastContainer position='bottom-center'>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg='success'
        >
          <Toast.Body>Viatura removida com sucesso!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={!!showModal} onHide={() => setShowModal(0)}>
        <Modal.Body>Quer mesmo remover esta viatura?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(0)}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={() => handleDelete(showModal)}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>
    </Wrap>
  );
};

export default Admin;
