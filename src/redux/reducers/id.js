import { SET_EXPENSE_ID, SET_NEXT_ID } from '../actions';

const INITIAL_STATE = {
  nextId: 0,
  currentId: 0,
};

const idReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EXPENSE_ID:
    return { ...state, currentId: action.payload };
  case SET_NEXT_ID:
    return { ...state, nextId: action.payload };
  default:
    return state;
  }
};

export default idReducer;
