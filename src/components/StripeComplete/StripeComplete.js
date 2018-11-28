import React, { Component } from 'react';
import firebase from '../../fire.js';
import { withRouter } from 'react-router';
import query_string from 'query-string';

class StripeComplete extends Component {

  constructor(props) {
    super(props);
    // https://chyp.ca/stripe-complete?scope=read_write&code=ac_CULLK0cjGPknlS3Ul8fv2X9nm3ygEsiI
    const qs = query_string.parse(this.props.location.search);
    console.log(qs);
    if (qs.error) {
      console.log('stripe declined')
    } else {
      const words = qs.state.split("event")
      console.log(words);
      firebase.database().ref('users/' + words[0] + '/stripe_creds/access_token').set(qs.code);
      this.props.history.push("/event?id=" + words[1]);
    }
  }

  render() {
      return (
        <div></div>
      );
  }

}

export default withRouter(StripeComplete);
