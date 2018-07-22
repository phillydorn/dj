import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import home from '../Home/HomeReducer';


export default {
  home,
  form: formReducer,
};

