import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Wrap } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllUsers, removeUser } from '../../../features/users/usersSlice';
import Image from '../../../components/Image';
import { Loader } from '../../../components';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  const handleDelete = (id) => dispatch(removeUser({ id }));

  const handleClick = (userId) => {
    navigate(`/users/viaturas/${userId}`);
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
            onClick={() => navigate(`/users/viaturas/new`)}
          >
            <FontAwesomeIcon icon='fa-solid fa-plus' /> Adicionar nova viatura
          </button>

          <table>
            <tbody>
              {users?.length ? (
                users?.map((user) => (
                  <tr key={user.id}>
                    <td
                      className='hand-pointer text-center'
                      onClick={() => handleClick(user.id)}
                    >
                      <Image
                        src={user?.fileName}
                        alt=''
                        style={{ with: '50px', height: '50px' }}
                      />
                    </td>
                    <td
                      className='hand-pointer'
                      onClick={() => handleClick(user.id)}
                    >
                      {user.marca}
                    </td>
                    <td
                      className='hand-pointer'
                      onClick={() => handleClick(user.id)}
                    >
                      {user.modelo}
                    </td>
                    <td
                      className='hand-pointer'
                      onClick={() => handleClick(user.id)}
                    >
                      {user.ano}
                    </td>
                    <td
                      className='hand-pointer'
                      onClick={() => handleClick(user.id)}
                    >
                      {user.kms}
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon='fa-solid fa-trash'
                        onClick={() => handleDelete(user.id)}
                        className='delete-icon hand-pointer'
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <h1>Nenhuma viatura registrada.</h1>
                    <Link to={`/users/viaturas/new`}>
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

export default Users;
