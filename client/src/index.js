import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store  from './JS/store/store';
import ReactDOM from 'react-dom/client';
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>

);

