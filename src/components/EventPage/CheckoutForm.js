import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import fire from '../../fire.js';

class CheckoutForm extends Component {
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: fire.auth().currentUser.displayName}).then(({token}) => {
      if (token)
        this.props.completePurchase(token);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id='ticket-form'>
        <CardElement style={{base: {fontSize: '18px'}}} />
        <button disabled={this.props.disabled} className='btn btn-primary'>{'PURCHASE TICKET: $' + parseFloat(this.props.price).toFixed(2) }</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
