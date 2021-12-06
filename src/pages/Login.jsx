import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitUserEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputEmailText: '',
      inputPasswordText: '',
      isDisabled: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.loginValidation);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { submitEmail } = this.props;
    const { inputEmailText } = this.state;

    submitEmail(inputEmailText);
    this.setState({
      redirect: true,
    });
  }

  loginValidation() {
    const { inputEmailText, inputPasswordText } = this.state;
    const PASSWORD_FLOOR = 6;
    const re = /\S+@\S+\.\S+/;
    const isValid = re.test(inputEmailText);

    if (isValid && inputPasswordText.length >= PASSWORD_FLOOR) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { inputEmailText, inputPasswordText, isDisabled, redirect } = this.state;

    if (redirect) {
      return <Navigate to="/carteira" />
    }
    return (
      <div className="login-form">
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="inputEmailText"
            placeholder="Email"
            className="login-input"
            onChange={ this.handleChange }
            value={ inputEmailText }
          />
          <input
            type="password"
            name="inputPasswordText"
            placeholder="Senha"
            className="login-input"
            onChange={ this.handleChange }
            value={ inputPasswordText }
          />
          <button type="submit" disabled={ isDisabled }>Entrar</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (email) => dispatch(submitUserEmail(email)),
});

Login.propTypes = {
  submitEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
