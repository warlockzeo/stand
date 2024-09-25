/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Footer, Banner } from '../../components';
import { Wrap } from './styles';

const Oficina = () => {
  const settings = useSelector((state) => state.settings.settings);
  const [setting, setSetting] = useState({});

  const fotos = [
    setting?.foto1 ? { fileName: setting.foto1 } : '',
    setting?.foto2 ? { fileName: setting.foto2 } : '',
  ].filter((foto) => !!foto !== false);

  useEffect(() => {
    setSetting(settings.filter((setting) => setting.option == 'oficina')[0]);
  }, [settings]);

  return (
    <Wrap>
      <div className='container'>
        <h1>Oficina</h1>
        {fotos.length ? <Banner images={fotos} expandeble={true} /> : null}
        <p>{setting?.about ?? null}</p>
        <h2>Onde nos encontrar?</h2>
        {setting?.morada1 && (
          <>
            <p>{setting?.morada1}</p>
            <p>{setting?.contacto1}</p>
            <p>{setting?.horario1}</p>
          </>
        )}
      </div>

      <Footer />
    </Wrap>
  );
};

export default Oficina;
