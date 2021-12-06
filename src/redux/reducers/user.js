import { SUBMIT_USER_EMAIL } from '../actions';

const USER_INITIAL_STATE = {
  email: '',
};

const userReducer = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_USER_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;