import React, { Component } from 'react';
import { withRouter } from 'react-router';
import fire from '../../fire.js';
import firebase from 'firebase';

import './LandingPage.css';

var FB = require('../../fb');

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(evt) {
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
      }).then( () => {
          FB.setAccessToken(result.credential.accessToken);
          FB.api(result.additionalUserInfo.profile.id, { fields: ["name","first_name","location","last_name","email","picture","events{start_time,place,cover,description,name,end_time,owner{name}}","friends"] }, res => {
          if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
          } else {
            fire.database().ref('users/' + result.user.uid).update({
              events: res.events,
              first_name: res.first_name,
              last_name: res.last_name,
              location: res.location
            }).then( () => {
              console.log('pushed')
              this.props.history.push('/create')
            })
          }
        });
      }).catch(function(error) {
        console.log(error);
      });
    });
  }

  render() {
    return (
      <div className='container' id='landing-page'>
        <div className='row'>
          <div className='col-12 col-md-6' id='text-col'>
            <h1>{'Chyp'}</h1>
            <h2>{'Instant ticketing for Facebook events.'}</h2>
            { fire.auth().currentUser ? null :
              <div role='button' id = "btnStart" onClick={this.buttonClick}>{'Start Here'}</div>
            }

          </div>
          <div className='col-12 col-md-6' id='phone-col'>
            <img src={require('./iPhoneX.png')} alt='iPhone' id='iPhone'/>

          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
