import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Elements } from 'react-stripe-elements';
import fire from '../../fire.js';
import firebase from 'firebase';

import CheckoutForm from './CheckoutForm';

export class TicketPurchase extends Component {

  constructor(props) {
    super(props);
    this.state = { stage: 'purchase' };
    fire.auth().onAuthStateChanged( user => {
      this.setState({ logged_in: user ? true : false });
    })
    this.calcPrices = this.calcPrices.bind(this);
    this.completePurchase = this.completePurchase.bind(this);
  }

  completePurchase(token) {
    // create the ticket object
    const ticket = {
      'prices': this.calcPrices(),
      'event': this.props.event,
      'purchaser': fire.auth().currentUser.uid,
      'status': 'placed',
      'card': token
    }
    console.log(ticket)

    // generate a ticket ID and push it to the event's node
    const ticketRef = fire.database().ref('events/' + ticket.event + '/tickets').push();
    ticketRef.set(ticket)
    // insert it to the user's node
    fire.database().ref('users/' + ticket.purchaser + '/tickets/' + ticketRef.key).set(ticket);
    // show a completed message
    this.setState({ stage: 'placed' })
  }

  onLoginClick() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("public_profile")
    provider.addScope('email')
    provider.addScope('user_events')
    provider.addScope('user_location')
    provider.addScope('user_friends')
    fire.auth().signInWithPopup(provider).then((result) => {
      fire.database().ref('users/' + result.user.uid).update({
        access_token: result.credential.accessToken,
        email: result.user.email,
        name: result.user.displayName,
        picture: result.user.photoURL,
        uid: result.user.uid,
        fb_id: result.additionalUserInfo.profile.id
      })
    });
  }

  calcPrices() {
    const ticketCENTS = parseFloat(this.props.price) * 100;
    const feesCENTS = Math.round(ticketCENTS * 0.033 + 40);
    const taxCENTS = Math.round((ticketCENTS + feesCENTS) * 0.13);
    const totalCENTS = ticketCENTS + feesCENTS + taxCENTS;
    return {
      ticket: ticketCENTS / 100,
      fees: feesCENTS / 100,
      tax: taxCENTS / 100,
      total: totalCENTS / 100
    }
  }

  render() {
    console.log(fire.auth().currentUser)
    if (!this.state) {
      return null
    } else {
      const prices = this.calcPrices();
      return (
        <Modal isOpen={this.props.modalOpen} toggle={this.props.toggleModal} id='checkout-modal'>
          <ModalHeader>{{
            'purchase': 'Purchase Your Ticket',
            'placed': 'Ticket Purchased!'
          }[this.state.stage]}</ModalHeader>
          <ModalBody>
            { this.state.stage === 'purchase' ? (
              <div id='purchaser-container'>
                <h6>{'YOUR PROFILE'}</h6>
                  {this.state.logged_in ? (
                    <div id='purchaser'>
                      <img src={fire.auth().currentUser.photoURL} />
                      <div>
                        <p>{fire.auth().currentUser.displayName}</p>
                        <p>{fire.auth().currentUser.email}</p>
                      </div>
                      <Button color='primary' onClick={ () => {fire.auth().signOut()} }>{'Not You?'}</Button>
                    </div>
                  ) : (
                    <Button color='primary' id='login-btn' onClick={this.onLoginClick}>{'Connect with Facebook to Continue'}</Button>
                  )}
                <div className='form-divider'></div>
                <h6>{'YOUR TICKET'}</h6>
                <div id='checkout-cart'>
                  <div>
                    <p>{'Ticket Price'}</p>
                    <p>{'$' + prices.ticket.toFixed(2)}</p>
                  </div>
                  <div>
                    <p>{'Chyp Fee'}</p>
                    <p>{'$' + prices.fees.toFixed(2)}</p>
                  </div>
                  <div>
                    <p>{'HST'}</p>
                    <p>{'$' + prices.tax.toFixed(2)}</p>
                  </div>
                  <div id='total-row'>
                    <p>{'Total'}</p>
                    <p>{'$' + prices.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className='form-divider'></div>

                <h6>{'YOUR PAYMENT'}</h6>
                <Elements>
                  <CheckoutForm disabled={!this.state.logged_in} price={prices.total} completePurchase={this.completePurchase} />
                </Elements>
              </div>
            ) : null }

            { this.state.stage === 'placed' ? (
              'Check your email for a proof of payment.'
            ) : null }
          </ModalBody>
        </Modal>
      )
    }
  }

}

export default TicketPurchase;
