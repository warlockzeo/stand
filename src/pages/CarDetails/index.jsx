import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import { Footer, Banner } from '../../components';

import { CarDetailsStyled, Container, Destaq } from './styles';
import { getAllCars } from '../../features/cars/carsSlice';
import { getAllFotos } from '../../features/fotos/fotosSlice';
import { formatCurrency } from '../../utils/formatCurrency';

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const carros = useSelector((state) => state.cars.cars);
  const fotos = useSelector((state) => state.fotos.fotos);

  const [carro, setCarro] = useState({});

  useEffect(() => {
    dispatch(getAllCars());
    dispatch(getAllFotos(id));
  }, [dispatch]);

  useEffect(() => {
    if (carros) {
      setCarro(carros.filter((carro) => carro.id === id)[0]);
    }
  }, [carros, id]);

  return (
    <CarDetailsStyled>
      {carro ? (
        <>
          <Banner images={fotos} expandeble={true} />
          <Destaq>
            <div>
              <h1>
                {carro.marca} - {carro.modelo}
              </h1>
              <p>xvdfg{carro.combustivel}</p>
            </div>
            <h2>{formatCurrency(carro.preco)}</h2>
          </Destaq>
          <Container>
            <h1>Detalhes</h1>
            <Row>
              <Col lg={4} sm={6} xs={12}>
                <span>Marca</span> Mercedes-Benz
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Modelo</span> C 250
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Sub-modelo</span> Classe C Versão d Aut.
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Combustível</span> Diesel
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Mês de Registo</span> Setembro 2016
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Quilómetros</span> 39 000 km
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Cilindrada</span> 2 143 cm3
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Potência</span> 204 cv
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Segmento</span> Cabrio
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Cor</span> Preto
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Tipo de cor</span> Metalizado
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Tipo de Caixa</span> Automáticad
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Número de Mudanças</span> 9
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Nº de portas</span> 2d
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Lotação</span> 4d
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Classe do veículo</span> Classe 1d
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Tracção</span> Tracção traseira
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Emissões CO2</span> 121 g/klg 64
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <span>Origem</span> Nacional
              </Col>
            </Row>

            <Row>
              <h2>Anotações</h2>
              <Col>fdsfsdfsdf</Col>
            </Row>
          </Container>
        </>
      ) : (
        <Container className='container'>
          <h1>Viatura não localizada</h1>
        </Container>
      )}
      <Footer />
    </CarDetailsStyled>
  );
};

export default CarDetails;
