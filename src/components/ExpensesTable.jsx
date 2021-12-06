import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, changeEditMode, setCurrentId } from '../redux/actions';
import getCurrencyNames from '../helpers/index';

class ExpensesTable extends Component {
  constructor() {
    super();

    this.edit = this.edit.bind(this);
    this.createEditButton = this.createEditButton.bind(this);
    this.exclude = this.exclude.bind(this);
    this.createExcludeButton = this.createExcludeButton.bind(this);
    this.createTableHead = this.createTableHead.bind(this);
    this.createTableBody = this.createTableBody.bind(this);
    this.createTable = this.createTable.bind(this);
    this.createEditModeTable = this.createEditModeTable.bind(this);
    this.createEditModeTableBody = this.createEditModeTableBody.bind(this);
  }

  edit(status, expenseId) {
    const { editMode, id } = this.props;
    editMode(status);
    id(expenseId);
  }

  createEditButton(status, expenseId) {
    return (
      <button
        type="button"
        onClick={ () => this.edit(status, expenseId) }
      >
        Editar despesa
      </button>
    );
  }

  exclude(expense) {
    const { excludeExpense } = this.props;
    excludeExpense(expense);
  }

  createExcludeButton(expense) {
    return (
      <button
        type="button"
        onClick={ () => this.exclude(expense) }
      >
        Excluir
      </button>
    );
  }

  createTableHead() {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }

  createTableBody(expense) {
    const currencyNames = getCurrencyNames();
    const { ask } = expense.exchangeRates[expense.currency];
    const askNumber = Number(ask);

    return (
      <tbody key={ expense.id }>
        <tr>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{expense.value}</td>
          <td>
            {currencyNames
              .find((currency) => expense.currency === currency.code).name}
          </td>
          <td>{askNumber.toFixed(2)}</td>
          <td>{(askNumber * expense.value).toFixed(2)}</td>
          <td>Real</td>
          <td>
            {this.createEditButton(true, expense.id)}
            {this.createExcludeButton(expense)}
          </td>
        </tr>
      </tbody>
    );
  }

  createTable() {
    const { expenses } = this.props;

    return (
      <table>
        {this.createTableHead()}
        {expenses.map((expense) => this.createTableBody(expense))}
      </table>
    );
  }

  createEditModeTableBody(expense) {
    const currencyNames = getCurrencyNames();
    const { ask } = expense.exchangeRates[expense.currency];
    const askNumber = Number(ask);

    return (
      <tbody key={ expense.id }>
        <tr>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{expense.value}</td>
          <td>
            {currencyNames
              .find((currency) => expense.currency === currency.code).name}
          </td>
          <td>{askNumber.toFixed(2)}</td>
          <td>{(askNumber * expense.value).toFixed(2)}</td>
          <td>Real</td>
        </tr>
      </tbody>
    );
  }

  createEditModeTable() {
    const { expenses } = this.props;

    return (
      <table>
        {this.createTableHead()}
        {expenses.map((expense) => this.createEditModeTableBody(expense))}
      </table>
    );
  }

  render() {
    const { isEditing } = this.props;
    return (
      <div>
        {isEditing ? this.createEditModeTable() : this.createTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  isEditing: state.editing.isEditing,
});

const mapDispatchToProps = () => (dispatch) => ({
  excludeExpense: (expense) => dispatch(deleteExpense(expense)),
  editMode: (isEditing) => dispatch(changeEditMode(isEditing)),
  id: (expenseId) => dispatch(setCurrentId(expenseId)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  excludeExpense: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editMode: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
