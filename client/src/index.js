import React from 'react';
import ReactDOM from 'react-dom';
import { SocketProvider } from './providers/socket';
import App from './App';

ReactDOM.render(
  <SocketProvider>
    <App />
  </SocketProvider>,
  document.getElementById('root')
);

