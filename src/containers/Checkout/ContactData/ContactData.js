import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders.js';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'postal',
          placeholder: 'Postal Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = event => {
    event.preventDefault ();
    this.setState ({ loading: true });
    let formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    let orders = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      name: formData.name,
      userId: this.props.userId,
      Date: new Date ().toDateString (),
    };
    this.props.onOrderBurger (orders, this.props.token);
  };

  checkValidity (value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim () !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElements = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElements.value = event.target.value;
    updatedFormElements.valid = this.checkValidity (
      updatedFormElements.value,
      updatedFormElements.validation
    );
    updatedFormElements.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElements;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState ({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push ({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map (formElement => {
          return (
            <Input
              changed={event =>
                this.inputChangedHandler (event, formElement.id)}
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              touched={formElement.config.touched}
              shoulValidate={formElement.config.validation}
              inValid={!formElement.config.valid}
            />
          );
        })}
        <Button
          disabled={!this.state.formIsValid}
          style={{
            display: 'block',
          }}
          btnType="Success">
          Submit
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h3>Enter your contact details</h3>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch (actions.purchaseBurger (orderData, token)),
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (
  ContactData,
  axios
);
