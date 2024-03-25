import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Wrap } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllCars, removeCar } from '../../features/cars/carsSlice';
import Image from '../../components/Image';
import { Loader } from '../../components';

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cars, isLoading } = useSelector((state) => state.cars);

  const handleDelete = (id) => dispatch(removeCar({ id }));

  const handleClick = (carId) => {
    navigate(`/admin/viaturas/${carId}`);
  };
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <Wrap className='container' isLoading={isLoading}>
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
                      onClick={() => handleClick(car.id)}
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
                        onClick={() => handleDelete(car.id)}
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
