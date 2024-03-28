import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Toast, ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getAllUsers, removeUser } from '../../../features/users/usersSlice';
import { Loader } from '../../../components';
import { Wrap } from './styles';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleDelete = (id) => {
    dispatch(removeUser({ id })).then(() => setShowToast(true));
    setShowModal(0);
  };

  const handleClick = (userId) => {
    navigate(`/admin/users/${userId}`);
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Wrap className='container' isLoading={isLoading}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Users</h1>
          <button
            type='button'
            className='btn btn-success'
            style={{ position: 'absolute', top: 0, right: 10 }}
            onClick={() => navigate(`/admin/users/new`)}
          >
            <FontAwesomeIcon icon='fa-solid fa-plus' />
          </button>

          <table>
            <tbody>
              {users?.length ? (
                users?.map(({ id, name, login }) => (
                  <tr key={id}>
                    <td
                      className='hand-pointer'
                      onClick={() => handleClick(id)}
                    >
                      {name}
                    </td>
                    <td
                      className='hand-pointer'
                      onClick={() => handleClick(id)}
                    >
                      {login}
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon='fa-solid fa-trash'
                        onClick={() => setShowModal(id)}
                        className='delete-icon hand-pointer'
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <h1>Nenhum usuário registrado.</h1>
                    <Link to={`/admin/users/new`}>
                      <button className='btn btn-primary'>
                        Registrar seu primeiro usuário{' '}
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

      <ToastContainer position='bottom-center'>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg='success'
        >
          <Toast.Body className='text-white'>
            Usuário removido com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={!!showModal} onHide={() => setShowModal(0)}>
        <Modal.Body>Quer mesmo remover este usuário?</Modal.Body>
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

export default Users;
