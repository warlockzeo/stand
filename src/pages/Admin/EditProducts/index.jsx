/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Row,
  Col,
  Tab,
  Tabs,
  Modal,
  Button,
  ToastContainer,
  Toast,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Uploader } from 'uploader'; // Installed by "react-uploader".
import { UploadButton } from 'react-uploader';

import { Loader } from '../../../components';
import {
  addProduct,
  getAllProducts,
  updateProduct,
} from '../../../features/products/productsSlice';
import {
  addProductFoto,
  removeProductFoto,
  getAllProductFotos,
  selectProductFoto,
} from '../../../features/productFotos/productFotosSlice';

import { SERVER_URL } from '../../../utils/constants';
import Field from '../Field';
import { Wrap } from './styles';

const EditProducts = () => {
  // Initialize once (at the start of your app).
  const uploader = Uploader({
    apiKey: 'free', // Get production API keys from Bytescale
  });
  // Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
  const options = { multi: true };

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productFotos = useSelector((state) => state.productFotos.productFotos);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const [product, setProduct] = useState(null);
  const [fotos, setFotos] = useState(productFotos || []);
  const [banner, setBanner] = useState(null);
  console.log(productFotos);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: product });

  const onSubmit = handleSubmit(async (product) => {
    if (id) {
      dispatch(updateProduct({ id: id, product: product }))
        .then(() => navigate('/admin/loja-produtos'))
        .catch((error) => console.error(error));
    } else {
      dispatch(addProduct({ ...product }))
        .then(() => navigate('/admin/loja-produtos'))
        .catch((error) => console.error(error));
    }
  });

  const onSubmitFotos = (photos) => {
    setSaving(true);
    if (id) {
      dispatch(
        addProductFoto({
          id: id,
          fotos: photos,
        })
      )
        .then(() => navigate('/admin/loja-produtos'))
        .catch((error) => console.error(error));
    } else {
      dispatch(addProduct(fotos));
      navigate('/admin/loja-produtos');
    }
  };

  const handleRemove = (id) => {
    dispatch(removeProductFoto({ id }))
      .then(() => setShowToast(true))
      .then(() => setFotos((fotos) => fotos.filter((foto) => foto.id != id)));
    setShowModal(0);
  };

  const handleSelectFoto = (id) => {
    setBanner(id);
    dispatch(selectProductFoto({ id }));
  };

  useEffect(() => {
    if (products.length) {
      setProduct(products.filter((product) => product.id == id)[0]);
    }
  }, [products, id, dispatch]);

  useEffect(() => {
    if (id) {
      setBanner(productFotos.filter((foto) => foto.banner == '1')?.[0]?.id);
    }
  }, [productFotos]);

  useEffect(() => {
    if (products.length < 1) {
      dispatch(getAllProducts());
    }

    if (id) {
      dispatch(getAllProductFotos(id)).then(({ payload }) => {
        setFotos(payload);
      });
    }
  }, []);

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
              <Row className='w-100'>
                <Col md={12}>
                  <span>{errors.name ? 'Nome é necessário.' : 'Nome'}</span>
                  <input
                    className='form-control'
                    type='text'
                    {...register('name')}
                    id='name'
                    placeholder='Nome'
                  />
                </Col>
                <Col md={12}>
                  <span>
                    {errors.descr ? 'Descrição é necessário.' : 'Descrição'}
                  </span>
                  <textarea
                    rows={5}
                    className='form-control'
                    {...register('descr')}
                    id='descr'
                    placeholder='Descrição'
                  />
                </Col>
                <Col md={6}>
                  <span>{errors.preco ? 'Preço é necessário.' : 'Preço'}</span>
                  <input
                    className='form-control'
                    type='number'
                    {...register('preco')}
                    id='preco'
                    placeholder='Preço'
                  />
                </Col>
                <Col md={6}>
                  <span>
                    {errors.quant ? 'Quantidade é necessária.' : 'Quantidade'}
                  </span>
                  <input
                    className='form-control'
                    type='number'
                    {...register('quant')}
                    id='quant'
                    placeholder='Quantidade'
                  />
                </Col>
              </Row>
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
          <div className='form-group' style={{ backgroundColor: '#eee' }}>
            <div className='form-input' style={{ padding: '20px' }}>
              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={(files) =>
                  onSubmitFotos(files.map((file) => file.originalFile.file))
                }
              >
                {({ onClick }) => (
                  <button onClick={onClick}>Adicione fotos...</button>
                )}
              </UploadButton>
            </div>
          </div>

          <div className='form-group' style={{ backgroundColor: '#eee' }}>
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
          <div className='form-buttons gap-2'>
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => navigate('/admin/loja-produtos')}
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

      {saving && (
        <div className='cover'>
          <Loader />
        </div>
      )}
    </Wrap>
  );
};

export default EditProducts;
