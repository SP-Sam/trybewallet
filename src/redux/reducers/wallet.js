import {
  GET_CURRENCIES, SUBMIT_EXPENSE, EDIT_EXPENSE, DELETE_EXPENSE,
} from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: [...state.currencies, ...action.payload],
    };

  case SUBMIT_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case EDIT_EXPENSE: {
    const currentExpense = state.expenses
      .map((expense) => {
        if (expense.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return expense;
      });

    return {
      ...state,
      expenses: [...currentExpense],
    };
  }
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense !== action.payload)],
    };

  default:
    return state;
  }
};

export default walletReducer;
