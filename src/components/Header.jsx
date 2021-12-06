import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();

    this.convertedValues = this.convertedValues.bind(this);
  }

  convertedValues() {
    const { expenses } = this.props;

    const currencyInfos = expenses.map((expense) => {
      const { value, currency, exchangeRates } = expense;
      return value * exchangeRates[currency].ask;
    });

    return currencyInfos;
  }

  render() {
    const { userEmail, expenses } = this.props;
    const converted = this.convertedValues();

    return (
      <div>
        <header>
          <span>{ userEmail }</span>
          <span>
            {!expenses
              ? '0'
              : converted.reduce((acc, curr) => acc + curr, 0).toFixed(2)}
          </span>
          <span>BRL</span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
