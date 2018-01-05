import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import visibilityReducer from './visibilityReducer';
import uploadsReducer from './uploadsReducer';
import productsReducer from './productsReducer';
import companiesReducer from './companiesReducer';
import infosReducer from './infosReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer,
  companies: companiesReducer,
  uploads: uploadsReducer,
  products: productsReducer,
  infos: infosReducer,
  visibility: visibilityReducer
});
