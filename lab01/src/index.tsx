import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FunctProvider, { defFunctionCtx } from './utils/context'

ReactDOM.render(
  <React.StrictMode>
    <FunctProvider value={defFunctionCtx}>
      <App />
    </FunctProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
