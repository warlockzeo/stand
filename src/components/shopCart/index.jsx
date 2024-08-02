import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getShopcart,
  removeShopcartItem,
} from '../../features/shopcart/shopcartSlice';
import { ShopcartStyle } from './styles';

const ShopCart = () => {
  const dispatch = useDispatch();
  const shopcart = useSelector((state) => state.shopcart.shopcart);
  const [showDetails, setShowDetails] = useState(false);

  const handleEnviarPedido = () => {
    const phoneNumber = '351934290403';
    let text = 'Tenho+interesse+em+comprar+:%0D';
    shopcart.forEach((item) => {
      text += encodeURI(`${item.quant} ${item.name}`) + '%0D';
    });
    const link = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${text}&type=phone_number&app_absent=0`;
    window.open(link);
  };

  useEffect(() => {
    if (!shopcart?.length) {
      dispatch(getShopcart());
    }
  }, []);

  return (
    <ShopcartStyle>
      <FontAwesomeIcon icon='fa fa-shopping-cart' className='icon' />
      {shopcart.length ? (
        <div
          className='items-number'
          onClick={() => setShowDetails(!showDetails)}
        >
          {shopcart.length}
        </div>
      ) : null}
      {shopcart.length && showDetails ? (
        <>
          <div
            className='cover-all'
            onClick={() => setShowDetails(!showDetails)}
          ></div>
          <div className='items'>
            <ul>
              {shopcart.length
                ? shopcart.slice(0, 5).map((item) => (
                    <li key={item.name}>
                      {item.quant} {item.name}{' '}
                      <FontAwesomeIcon
                        icon='fa-solid fa-trash'
                        onClick={() => dispatch(removeShopcartItem(item.id))}
                        className='delete-icon hand-pointer'
                      />
                    </li>
                  ))
                : null}
            </ul>
            <div className='buttons'>
              <button
                className='btn btn-success form-control'
                onClick={handleEnviarPedido}
              >
                Enviar pedido
              </button>
            </div>
          </div>
        </>
      ) : null}
    </ShopcartStyle>
  );
};

export default ShopCart;
