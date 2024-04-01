import React from 'react';
import { useSelector } from 'react-redux';

import { FooterStyles } from './styles';
import { Col } from 'react-bootstrap';

const Footer = () => {
  const settings = useSelector((state) => state.settings.settings);

  return (
    <FooterStyles className='row'>
      <Col xs={12} md={4}>
        <h1>Sobre nós</h1>
        <p>{settings?.about}</p>
      </Col>
      <Col xs={12} md={4}>
        <h1>Onde estamos</h1>
        {settings?.morada1 ? (
          <p>
            {settings?.morada1}
            <br />
            {settings?.contacto1}
            <br />
            {settings?.horario1}
          </p>
        ) : null}
        {settings?.morada2 ? (
          <p>
            {settings?.morada2}
            <br />
            {settings?.contacto2}
            <br />
            {settings?.horario2}
          </p>
        ) : null}
        {settings?.morada3 ? (
          <p>
            {settings?.morada3}
            <br />
            {settings?.contacto3}
            <br />
            {settings?.horario3}
          </p>
        ) : null}
      </Col>
      {settings?.facebook || settings?.instagram || settings?.youtube ? (
        <Col xs={12} md={4}>
          <h1>Redes Sociais</h1>
          {settings.facebook ? (
            <p>
              <a href={settings.facebook}>
                <i className='bi bi-facebook' /> Facebook
              </a>
            </p>
          ) : null}
          {settings.instagram ? (
            <p>
              <a href={settings.instagram}>
                <i className='bi bi-instagram' /> Instagram
              </a>
            </p>
          ) : null}
          {settings.youtube ? (
            <p>
              <a href={settings.youtube}>
                <i className='bi bi-youtube' /> Youtube
              </a>
            </p>
          ) : null}
          {settings.tiktok ? (
            <p>
              <a href={settings.tiktok}>
                <i className='bi bi-tiktok' /> TikTok
              </a>
            </p>
          ) : null}
        </Col>
      ) : (
        ''
      )}
    </FooterStyles>
  );
};

export default Footer;
