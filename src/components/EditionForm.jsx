/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { changeEditMode, setCurrentId, thunkEditExpense } from '../redux/actions';

class EditionForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.settingState = this.settingState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);

    this.createValueInput = this.createValueInput.bind(this);
    this.createCurrencyInput = this.createCurrencyInput.bind(this);
    this.createMethodInput = this.createMethodInput.bind(this);
    this.createTagInput = this.createTagInput.bind(this);
    this.createDescriptionInput = this.createDescriptionInput.bind(this);
    this.createForm = this.createForm.bind(this);
  }

  componentDidMount() {
    this.settingState();
  }

  settingState() {
    const { expenses, id } = this.props;
    const expenseId = expenses.find((expense) => expense.id === id);

    this.setState({
      value: expenseId.value,
      currency: expenseId.currency,
      method: expenseId.method,
      tag: expenseId.tag,
      description: expenseId.description,
    });
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  saveExpense(e) {
    e.preventDefault();
    const { editExpense, editMode, id } = this.props;
    const { value, currency, method, tag, description } = this.state;

    const expenseInfos = {
      id,
      value,
      currency,
      method,
      tag,
      description,
    };

    editExpense(expenseInfos);
    editMode(false);

    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  createValueInput() {
    const { value } = this.state;

    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          id="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  createCurrencyInput() {
    const { currencies } = this.props;
    const { currency } = this.state;

    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((currenc) => (
            currenc === 'USDT'
              ? null
              : (
                <option
                  key={ currenc }
                  value={ currenc }
                >
                  { currenc }
                </option>
              )
          ))}
        </select>
      </label>
    );
  }

  createMethodInput() {
    const { method } = this.state;

    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  createTagInput() {
    const { tag } = this.state;

    return (
      <label htmlFor="tag">
        Categoria:
        <select
          id="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  createDescriptionInput() {
    const { description } = this.state;

    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          id="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  createForm() {
    return (
      <form onSubmit={ this.saveExpense }>
        {this.createValueInput()}
        {this.createCurrencyInput()}
        {this.createMethodInput()}
        {this.createTagInput()}
        {this.createDescriptionInput()}
        <button type="submit">Editar despesa</button>
      </form>
    );
  }

  render() {
    return (
      this.createForm()
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  id: state.id.currentId,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (expenseInfos) => dispatch(thunkEditExpense(expenseInfos)),
  editMode: (isEditing) => dispatch(changeEditMode(isEditing)),
  expenseId: (expenseId) => dispatch(setCurrentId(expenseId)),
});

EditionForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editMode: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditionForm);
