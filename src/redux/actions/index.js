import getExchangeRates from "../../helpers/getExchangeRates";

export const SUBMIT_USER_EMAIL = 'SUBMIT_USER_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SUBMIT_EXPENSE = 'SUBMIT_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CHANGE_EDIT_MODE = 'CHANGE_EDIT_MODE';
export const SET_EXPENSE_ID = 'SET_EXPENSE_ID';
export const SET_NEXT_ID = 'SET_NEXT_ID';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const submitUserEmail = (email) => ({
  type: SUBMIT_USER_EMAIL,
  payload: email,
});

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

const submitExpense = (expense, exchangeRates) => ({
  type: SUBMIT_EXPENSE,
  payload: {
    ...expense,
    exchangeRates,
  },
});

export const editExpense = (expense, exchangeRates) => ({
  type: EDIT_EXPENSE,
  payload: {
    ...expense,
    exchangeRates,
  },
});

export const changeEditMode = (isEditing) => ({
  type: CHANGE_EDIT_MODE,
  payload: isEditing,
});

export const setCurrentId = (expenseId) => ({
  type: SET_EXPENSE_ID,
  payload: expenseId,
});

export const setNextId = (nextId) => ({
  type: SET_NEXT_ID,
  payload: nextId,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  payload: expense,
});

export const thunkGetCurrencies = () => async (dispatch) => {
  const exchangeRates = await getExchangeRates();
  return dispatch(getCurrencies(Object.keys(exchangeRates)));
};

export const thunkSubmitExpense = (expenseInfos) => async (dispatch) => {
  const exchangeRates = await getExchangeRates();
  return dispatch(submitExpense(expenseInfos, exchangeRates));
};

export const thunkEditExpense = (expenseInfos) => async (dispatch) => {
  const exchangeRates = await getExchangeRates();
  return dispatch(editExpense(expenseInfos, exchangeRates));
};
