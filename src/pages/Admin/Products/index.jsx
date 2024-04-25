import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button, Toast, ToastContainer } from 'react-bootstrap';

import {
  getAllProducts,
  removeProduct,
} from '../../../features/products/productsSlice';
import { Loader, Image } from '../../../components';
import { Wrap, EmptyArray } from './styles';

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleDelete = (id) => {
    dispatch(removeProduct({ id })).then(() => setShowToast(true));
    setShowModal(0);
  };

  const handleClick = (productId) => navigate(`/admin/products/${productId}`);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Wrap className='container'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {products?.length ? (
            <>
              <h1>Meus Produtos</h1>
              <button
                type='button'
                className='btn btn-success'
                style={{ position: 'absolute', top: 0, right: 10 }}
                onClick={() => navigate(`/admin/products/new`)}
              >
                <FontAwesomeIcon icon='fa-solid fa-plus' />
              </button>
              <table>
                <thead>
                  <tr>
                    <th>Banner</th>
                    <th>Produto</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, index) => (
                    <tr key={index}>
                      <td
                        className='hand-pointer text-center'
                        onClick={() => setShowModal(product.id)}
                      >
                        <Image
                          src={product?.fileName}
                          alt=''
                          style={{ with: '50px', height: '50px' }}
                        />
                      </td>
                      <td
                        className='hand-pointer'
                        onClick={() => handleClick(product.id)}
                      >
                        {product.name}
                      </td>
                      <td
                        className='hand-pointer'
                        onClick={() => handleClick(product.id)}
                      >
                        {product.descr}
                      </td>
                      <td
                        className='hand-pointer'
                        onClick={() => handleClick(product.id)}
                      >
                        {product.preco}
                      </td>
                      <td
                        className='hand-pointer'
                        onClick={() => handleClick(product.id)}
                      >
                        {product.quant}
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon='fa-solid fa-trash'
                          onClick={() => setShowModal(product.id)}
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
              <h1>Nenhum produto encontrado.</h1>
              <Link to={`/admin/products/new`}>
                <button className='btn btn-primary'>
                  Registrar seu primeiro produto
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
          <Toast.Body>Produto removido com sucesso!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={!!showModal} onHide={() => setShowModal(0)}>
        <Modal.Body>Quer mesmo remover este produto?</Modal.Body>
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

export default Products;
