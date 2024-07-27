import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Footer, Carousel2 } from '../../components';

import { ProductDetailsStyled, Container, Destaq } from './styles';
import { getAllProducts } from '../../features/products/productsSlice';
import { getAllProductFotos } from '../../features/productFotos/productFotosSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import { SERVER_URL } from '../../utils/constants';

const Field = ({ label, data, icon, icon2 }) => (
  <Col xl={4} xs={6} className='field'>
    {icon && <FontAwesomeIcon icon={`fa-solid ${icon}`} />}
    {icon2 && <img alt={icon2} src={`/assets/${icon2}`} />}
    <div>
      <span>{label}</span> {data}
    </div>
  </Col>
);

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productFotos = useSelector((state) => state.productFotos.productFotos);
  const [product, setproduct] = useState(null);

  const data = productFotos.map((foto) => ({
    image: foto?.fullName ?? `${SERVER_URL}/imagens/${foto?.fileName}`,
  }));

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setproduct(products.filter((product) => product.id === id)[0]);
    }
  }, [products, id]);

  useEffect(() => {
    dispatch(getAllProductFotos(id));
  }, [id]);

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  };

  return (
    <ProductDetailsStyled>
      {product ? (
        <>
          <Container>
            <Col lg={4} sm={6} xs={12}>
              <Destaq>
                <Col lg={8} xs={12}>
                  <h1>{product.name}</h1>
                </Col>
                <Col xs={12}>
                  <h2>{formatCurrency(product.preco)}</h2>
                </Col>
              </Destaq>

              <Row>
                <Field data={product.descr} />
              </Row>
              {product.observacoes ? (
                <Row>
                  <h2>Observações</h2>
                  <Col>{product.observacoes}</Col>
                </Row>
              ) : null}
            </Col>
            <Col xs={12} md={8}>
              <Carousel2
                data={data}
                time={3000}
                width='100%'
                height='400px'
                captionStyle={captionStyle}
                radius='10px'
                slideNumber={false}
                captionPosition='bottom'
                automatic={true}
                dots={true}
                pauseIconColor='white'
                pauseIconSize='40px'
                slideBackgroundColor='transparent'
                slideImageFit='cover'
                thumbnails={true}
                thumbnailWidth='100px'
                showNavBtn={true}
              />
            </Col>
          </Container>
        </>
      ) : (
        <Container className='container'>
          <h1>Produto não localizada</h1>
        </Container>
      )}
      <Footer />
    </ProductDetailsStyled>
  );
};

export default ProductDetails;
