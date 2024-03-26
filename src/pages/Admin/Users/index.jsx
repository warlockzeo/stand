import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Wrap } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllUsers, removeUser } from '../../../features/users/usersSlice';
import { Loader } from '../../../components';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  const handleDelete = (id) => dispatch(removeUser({ id }));

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
            style={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => navigate(`/admin/users/new`)}
          >
            <FontAwesomeIcon icon='fa-solid fa-plus' /> Adicionar novo usuário
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
                        onClick={() => handleDelete(id)}
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
    </Wrap>
  );
};

export default Users;
