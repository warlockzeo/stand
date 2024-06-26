import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Carousel } from 'react-carousel-minimal';
import { Footer, Carousel2 } from '../../components';

import { CarDetailsStyled, Container, Destaq } from './styles';
import { getAllCars } from '../../features/cars/carsSlice';
import { getAllFotos } from '../../features/fotos/fotosSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import { SERVER_URL } from '../../utils/constants';

const Field = ({ label, data, icon, icon2 }) => (
  <Col lg={4} sm={6} xs={12} className='field'>
    {icon ? (
      <FontAwesomeIcon icon={`fa-solid ${icon}`} />
    ) : (
      <img alt={icon2} src={`/assets/${icon2}`} />
    )}
    <div>
      <span>{label}</span> {data}
    </div>
  </Col>
);

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const fotos = useSelector((state) => state.fotos.fotos);
  const [car, setCar] = useState(null);

  const data = fotos.map((foto) => ({
    image: foto?.fullName ?? `${SERVER_URL}/imagens/${foto?.fileName}`,
  }));

  useEffect(() => {
    dispatch(getAllCars());
    dispatch(getAllFotos(id));
  }, [dispatch]);

  useEffect(() => {
    if (cars) {
      setCar(cars.filter((car) => car.id == id)[0]);
    }
  }, [cars, id]);

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  };

  return (
    <CarDetailsStyled>
      {car ? (
        <>
          <Container>
            <Col xs={12} md={6}>
              <Row>
                <Destaq>
                  <div>
                    <h1>
                      {car.marca} {car.modelo}
                    </h1>
                    <p>{car.combustivel}</p>
                  </div>
                  <h2>{formatCurrency(car.preco)}</h2>
                </Destaq>

                <Field label='Registo' data={car.registo} icon='fa-calendar' />
                <Field
                  label='Quilómetros'
                  data={car.quilometros}
                  icon='fa-road'
                />
                <Field
                  label='Lugares'
                  data={car.lugares}
                  icon2='car-seat.png'
                />
                <Field label='Segmento' data={car.segmento} icon='fa-car' />
                <Field
                  label='Combustível'
                  data={car.combustivel}
                  icon2='gas-station.png'
                />
                <Field label='Potência' data={car.potencia} icon2='power.png' />
                <Field
                  label='Cilindrada'
                  data={car.cilindrada}
                  icon2='piston.png'
                />
                <Field
                  label='Transmissão'
                  data={car.tipoCaixa}
                  icon2='gearbox.png'
                />
                <Field label='Cor' data={car.cor} icon2='paint-brush.png' />
                <Field label='Portas' data={car.portas} icon2='car.png' />
                <Field label='Estado' data={car.estado} icon='fa-star' />
                <Field label='Garantia' data={car.garantia} icon2='medal.png' />
              </Row>

              <Row>
                <h2>Observações</h2>
                <Col>{car.observacoes}</Col>
              </Row>
            </Col>
            <Col xs={12} md={6}>
              {/* <Carousel2
                data={data}
                time={3000}
                width='100%'
                height='500px'
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
                style={{
                  textAlign: 'center',
                  maxWidth: '850px',
                  maxHeight: '500px',
                  margin: '0  auto 40px auto',
                }}
              /> */}
            </Col>
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
