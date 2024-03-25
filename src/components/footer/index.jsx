import React from 'react';
import { useSelector } from 'react-redux';

import { FooterStyles } from './styles';

const Footer = () => {
  const settings = useSelector((state) => state.settings.settings?.[0]);

  return (
    <FooterStyles>
      <section className='col-md-4'>
        <h1>Sobre nós</h1>
        <p>{settings?.about}</p>
      </section>
      <section className='col-md-4'>
        <h1>Onde estamos</h1>
        {settings?.morada1 ? (
          <p>
            settings?.morada1
            <br />
            {settings?.contacto1}
            <br />
            {settings?.horario1}
          </p>
        ) : null}
        {settings?.morada2 ? (
          <p>
            settings?.morada2
            <br />
            {settings?.contacto2}
            <br />
            {settings?.horario2}
          </p>
        ) : null}
        {settings?.morada3 ? (
          <p>
            settings?.morada3
            <br />
            {settings?.contacto3}
            <br />
            {settings?.horario3}
          </p>
        ) : null}
      </section>
      {settings?.facebook || settings?.instagram || settings?.youtube ? (
        <section className='col-md-4'>
          <h1>Redes Sociais</h1>
          {settings.facebook ? (
            <p>
              <i className='bi bi-facebook' />
              {settings.facebook}
            </p>
          ) : null}
          {settings.instagram ? (
            <p>
              <i className='bi bi-instagram' />
              {settings.instagram}
            </p>
          ) : null}
          {settings.youtube ? (
            <p>
              <i className='bi bi-youtube' />
              {settings.youtube}
            </p>
          ) : null}
        </section>
      ) : (
        ''
      )}
    </FooterStyles>
  );
};

export default Footer;
