/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  thunkSubmitExpense,
  thunkGetCurrencies,
  setNextId
} from '../redux/actions';
import EditionForm from '../components/EditionForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

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
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  saveExpense(e) {
    e.preventDefault();
    const { submitExpense, id, nextId } = this.props;
    const { value, currency, method, tag, description } = this.state;
    nextId(id + 1);

    const expenseInfos = {
      id,
      value,
      currency,
      method,
      tag,
      description,
    };

    submitExpense(expenseInfos);

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
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }

  render() {
    const { isEditing } = this.props;
    return (
      <div>
        <Header />
        {isEditing ? <EditionForm /> : this.createForm()}
        <ExpensesTable />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isEditing: state.editing.isEditing,
  id: state.id.nextId,
});

const mapDispatchToProps = (dispatch) => ({
  submitExpense: (expenseInfos) => dispatch(thunkSubmitExpense(expenseInfos)),
  getCurrencies: () => dispatch(thunkGetCurrencies()),
  nextId: (newId) => dispatch(setNextId(newId)),
});

Wallet.propTypes = {
  submitExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  nextId: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
