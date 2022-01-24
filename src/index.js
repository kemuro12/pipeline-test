import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import store from "./Redux/Store";

import {ThemeProvider} from '@material-ui/core';
import theme from "./theme/theme"

import * as axios from "axios";

require('dotenv').config()

console.log(process.env)

let token = window.localStorage.getItem('auth_token');
if(token) axios.defaults.headers.common['Authorization'] = 'bearer ' + token;

ReactDOM.render(
  <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App/>
        </Provider>
      </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);