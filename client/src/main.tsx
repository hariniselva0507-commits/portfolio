import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Bootstrap 5 & Icons Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Custom Modern Theme & Layout CSS
import './styles/custom.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
