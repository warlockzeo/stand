/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FooterStyles } from './styles';
import { Col } from 'react-bootstrap';

const Footer = () => {
  const settings = useSelector((state) => state.settings.settings);
  const [setting, setSetting] = useState({});

  useEffect(() => {
    setSetting(settings.filter((setting) => setting.option == 'footer')[0]);
  }, [settings]);

  return (
    <FooterStyles className='row'>
      <Col xs={12} md={4}>
        <h1>Sobre nós</h1>
        <p>{setting?.about}</p>
      </Col>
      <Col xs={12} md={4}>
        <h1>Onde estamos</h1>
        {setting?.morada1 ? (
          <p>
            {setting?.morada1}
            <br />
            {setting?.contacto1}
            <br />
            {setting?.horario1}
          </p>
        ) : null}
        {setting?.morada2 ? (
          <p>
            {setting?.morada2}
            <br />
            {setting?.contacto2}
            <br />
            {setting?.horario2}
          </p>
        ) : null}
        {setting?.morada3 ? (
          <p>
            {setting?.morada3}
            <br />
            {setting?.contacto3}
            <br />
            {setting?.horario3}
          </p>
        ) : null}
      </Col>
      {setting?.facebook || setting?.instagram || setting?.youtube ? (
        <Col xs={12} md={4}>
          <h1>Redes Sociais</h1>
          {setting.facebook ? (
            <p>
              <a href={setting.facebook}>
                <i className='bi bi-facebook' /> Facebook
              </a>
            </p>
          ) : null}
          {setting.instagram ? (
            <p>
              <a href={setting.instagram}>
                <i className='bi bi-instagram' /> Instagram
              </a>
            </p>
          ) : null}
          {setting.youtube ? (
            <p>
              <a href={setting.youtube}>
                <i className='bi bi-youtube' /> Youtube
              </a>
            </p>
          ) : null}
          {setting.tiktok ? (
            <p>
              <a href={setting.tiktok}>
                <i className='bi bi-tiktok' /> TikTok
              </a>
            </p>
          ) : null}
          {setting.whatsapp ? (
            <p>
              <a
                href={`https://api.whatsapp.com/send/?phone=${setting.whatsapp}`}
                target='_blank'
                rel='noreferrer'
              >
                <i className='bi bi-whatsapp' /> Whatsapp
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
