import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Footer, Banner } from '../../components';
import { Wrap } from './styles';

const Oficina = () => {
  const settings = useSelector((state) => state.settings.settings);
  const [setting, setSetting] = useState({});

  useEffect(() => {
    setSetting(settings.filter((setting) => setting.option == 'oficina')[0]);
  }, [settings]);

  return (
    <Wrap>
      <Banner images={setting} expandeble={true} />
      <div className='container'>
        <h1>Oficina</h1>

        <img src='' alt='' />
        <img src='' alt='' />

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
