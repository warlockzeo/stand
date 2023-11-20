import React from 'react';
import { FooterStyles } from './styles';

const Footer = () => {
  return (
    <>
      <FooterStyles>
        <section className='col-md-4'>
          <h1>titulo footer</h1>
          <p>
            texto footer Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Perferendis aspernatur unde quis quia totam odit eveniet
            tempore aliquam voluptate. Molestias velit accusamus a rerum quia
            voluptate dolores dolore aspernatur consectetur!
          </p>
        </section>
        <section className='col-md-3'>
          <h1>footer menu</h1>
          <ul>
            <li>Home</li>
            <li>Carros</li>
            <li>About</li>
          </ul>
        </section>
        <section className='col-md-5'>
          <h1>Working hours</h1>
        </section>
      </FooterStyles>
    </>
  );
};

export default Footer;
