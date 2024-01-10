import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './providers/socket';
import App from './App';

ReactDOM.render(
  <SocketProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SocketProvider>,
  document.getElementById('root')
);

