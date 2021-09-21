import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FunctProvider from './utils/context'
import { functs } from './utils/functs';

ReactDOM.render(
  <React.StrictMode>
    <FunctProvider value={functs}>
      <App />
    </FunctProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
