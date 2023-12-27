import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Wrap } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllCars, removeCar } from '../../features/cars/carsSlice';
import noImage from '../../features/no-image.png';
import { Loader } from '../../components';

const Admin = () => {
  const dispatch = useDispatch();
  const { cars, isLoading } = useSelector((state) => state.cars);
  //  const cars = carsState?.cars || [];

  const handleDelete = (id) =>
    dispatch(removeCar({ id })).then(() => dispatch(getAllCars()));

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <Wrap className='container' isLoading={isLoading}>
      {isLoading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th colSpan={5}>
                <h1>Minhas viaturas</h1>
              </th>
              <th>
                <Link to={`/admin/viaturas/new`}>
                  <FontAwesomeIcon icon='fa-solid fa-plus' />
                </Link>
              </th>
            </tr>
          </thead>
          {cars?.length ? (
            <tbody>
              {cars?.map((carro) => (
                <tr key={carro.id}>
                  <td>
                    <img src={carro?.fotos?.[0] ?? noImage} alt='' />
                  </td>
                  <td>{carro.marca}</td>
                  <td>{carro.modelo}</td>
                  <td>{carro.ano}</td>
                  <td>{carro.kms}</td>
                  <td>
                    <Link to={`/admin/viaturas/${carro.id}`}>
                      <FontAwesomeIcon icon='fa-solid fa-gear' />
                    </Link>
                    <FontAwesomeIcon
                      icon='fa-solid fa-trash'
                      onClick={() => handleDelete(carro.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
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
            </tbody>
          )}
        </table>
      )}
    </Wrap>
  );
};

export default Admin;
