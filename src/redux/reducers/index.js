import { combineReducers } from "redux";
import user from './user';
import wallet from './wallet';
import id from './id';
import editing from './editing';

const rootReducer = combineReducers({
  user,
  wallet,
  id,
  editing,
});

export default rootReducer;
