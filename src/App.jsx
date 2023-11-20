import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Site from './utils/Site';

const App = () => {
  library.add(fas);

  return (
    <div className='App'>
      <Site />
    </div>
  );
};

export default App;
