import React from 'react'
import { legacy_createStore as createStore } from 'redux';
import Cookies from 'js-cookie';

const initializeData = {
  JWT: Cookies.get('token')? Cookies.get('token') : "",
  id: Cookies.get('id')? Cookies.get('id') : ""
}

const reducer = (state = initializeData, action) => {

  if (action.type === 'LOGIN') {
    return {
      ...state,
      JWT: action.token,
      id: action.id
    }
  }
  return state
}

const store = createStore(reducer);
export default store;