import { CHANGE_EDIT_MODE } from '../actions';

const INITIAL_STATE = {
  isEditing: false,
};

const editingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_EDIT_MODE:
    return { ...state, isEditing: action.payload };
  default:
    return state;
  }
};

export default editingReducer;
