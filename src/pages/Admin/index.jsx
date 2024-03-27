import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button, Toast, ToastContainer } from 'react-bootstrap';

import { getAllCars, removeCar } from '../../features/cars/carsSlice';
import { Loader, Image } from '../../components';
import { Wrap } from './styles';

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

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

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
          <Toast.Header>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
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

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Minhas viaturas</h1>

          <button
            type='button'
            className='btn btn-success'
            style={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => navigate(`/admin/viaturas/new`)}
          >
            <FontAwesomeIcon icon='fa-solid fa-plus' /> Adicionar nova viatura
          </button>

          <table>
            <tbody>
              {cars?.length ? (
                cars?.map((car) => (
                  <tr key={car.id}>
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
                    <td
                      className='hand-pointer'
                      onClick={() => handleClick(car.id)}
                    >
                      {car.kms}
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon='fa-solid fa-trash'
                        onClick={() => setShowModal(car.id)}
                        className='delete-icon hand-pointer'
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <h1>Nenhuma viatura registrada.</h1>
                    <Link to={`/admin/viaturas/new`}>
                      <button className='btn btn-primary'>
                        Registrar sua primeira viatura{' '}
                        <FontAwesomeIcon icon='fa-solid fa-plus' />
                      </button>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </Wrap>
  );
};

export default Admin;
