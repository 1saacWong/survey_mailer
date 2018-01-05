import axios from 'axios';
import _ from 'lodash';

import { browserHistory } from 'react-router';
import {
  FETCH_USER,
  FETCH_UPLOAD,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_SURVEYS,
  FETCH_UPLOADS,
  FETCH_COMPANY,
  FETCH_COMPANIES,
  HIDE_REVIEW,
  SHOW_REVIEW,
  UNAUTH_USER,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_INFOS
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signupUser = ({ email, password }, history) => dispatch => {
  console.log(email, password);
  axios
    .post('/auth/email', { email, password })
    .then(response => {
      debugger;
      //if request is good, update state to indicate user is authenticated
      dispatch({ type: AUTH_USER });
      //save jwt token
      localStorage.setItem('token', response.data.token);
      //redirect to route '/feature'
      history.push('/uploads');
      browserHistory.push('/uploads');
    })
    .catch(error => {
      //if request is bad
      //show an error
      dispatch(authError(error.response.data.error));
    });
};

export const signinUser = ({ email, password }) => async dispatch => {
  //submit email/password to the server
  console.log(email, password);
  const res = await axios.post('/auth/email', { email, password });
  console.log(res);
  //if request is good, update state to indicate user is authenticated
  dispatch({ type: AUTH_USER });
  //save jwt token
  localStorage.setItem('token', res.data.token);
  //redirect to route '/feature'
  browserHistory.push('/uploads');
};

export const authError = error => async dispatch => {
  dispatch({
    type: AUTH_ERROR,
    payload: error
  });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitUpload = (values, history) => async dispatch => {
  let data = new FormData();

  data.append('file', values.image[0], Date.now() + values.image[0].name);
  _.forEach(_.keys(values), key => {
    if (key != 'image') {
      data.append(key, values[key]);
    }
  });
  const res = await axios.post('/api/uploads', data);
  history.push('/uploads');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitEntry = values => async dispatch => {
  const res = await axios.post('/api/entries', values);
  // history.push('/uploads/list');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitRejection = values => async dispatch => {
  const res = await axios.post('/api/rejections', values);
  // history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const hideReview = () => async dispatch => {
  debugger;
  dispatch({
    type: HIDE_REVIEW
  });
};

export const fileUpload = file => async dispatch => {
  const res = await axios.post('/api/uploads/new', file);
  // history.push('/thankyou');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUpload = id => async dispatch => {
  const res = await axios.get(`/api/uploads/${id}`);
  dispatch({
    type: FETCH_UPLOAD,
    payload: res.data
  });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchUploads = () => async dispatch => {
  const res = await axios.get('/api/uploads');
  dispatch({ type: FETCH_UPLOADS, payload: res.data });
};

export const fetchCompanies = () => async dispatch => {
  const res = await axios.get('/api/companies');
  dispatch({ type: FETCH_COMPANIES, payload: res.data });
};

export const fetchPrices = id => async dispatch => {
  const res = await axios.get(`/api/prices/${id}`);
  dispatch({ type: FETCH_USER, payload: res.data.user });
  dispatch({ type: FETCH_INFOS, payload: res.data.product });
};

export const fetchCompany = id => async dispatch => {
  const res = await axios.get(`/api/companies/${id}`);
  dispatch({
    type: FETCH_COMPANY,
    payload: res.data
  });
};

export const fetchProducts = () => async dispatch => {
  const res = await axios.get('/api/products');
  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};

export const searchCompanies = ({ searchQuery }) => async dispatch => {
  const res = await axios.get(`/api/companies/search/${searchQuery}`);
  dispatch({ type: FETCH_COMPANIES, payload: res.data });
};

export const showReview = () => async dispatch => {
  dispatch({
    type: SHOW_REVIEW
  });
};

// export function signinUser({ email, password }){
//   return function(dispatch) {
//     //submit email/password to the server
//     axios.post(`${ROOT_URL}/signin`, { email, password })
//       .then(response => {
//         //if request is good, update state to indicate user is authenticated
//         dispatch({ type: AUTH_USER });
//         //save jwt token
//         localStorage.setItem('token', response.data.token);
//         //redirect to route '/feature'
//         browserHistory.push('/feature');
//       })
//       .catch(() => {
//         //if request is bad
//         //show an error
//         dispatch(authError('Bad Login'))
//       });
//   }
// };

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}
//
// export function authError(error){
//   return {
//     type: AUTH_ERROR,
//     payload: error
//   };
// };

// export function fetchMessage(){
//   return function(dispatch) {
//     axios.get(ROOT_URL, {
//       headers: { authorization: localStorage.getItem('token') }
//     })
//       .then( response => {
//         dispatch({
//           type: FETCH_MESSAGE,
//           payload: response.data.message
//         });
//       });
//   }
// };

// export function setLocation({ address }){
//   return {
//     type: SET_LOCATION,
//     payload: address
//   }
// };
