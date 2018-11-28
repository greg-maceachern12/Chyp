import React, { Component } from 'react';
import './Create.css';
import '../../App.js'
import CreateCard from './CreateCard';
import fire from '../../fire.js';


class Create extends Component {

  componentWillMount() {
    if (!fire.auth().currentUser){
      window.location.href = "../";
      alert('Please Login With Facebook to Continue!')
      return
    } else {
      let firstName = fire.auth().currentUser.displayName;
      fire.database().ref('users/' + fire.auth().currentUser.uid + '/events/data').once('value', res => {
        let total = [];
        res.val() && res.val().forEach( event => {
          console.log(event);
          let eventTime = new Date(event.start_time).getTime();
          let currentTime = new Date().getTime();
          if ((event.owner.name ==firstName) && (eventTime >= currentTime)) {
            total.push(event);
          }
        });
        console.log(total);
        if (!total) {
          window.location.href = "../";
          alert('You are not an admin to any events!')
        } else {
          this.setState({ events: total });
        }
      })
    }
  }

  render() {
    if (!this.state || !this.state.events) {
      return null
    } else {
      return (
       <div>
         <h1 id="title">Choose an Event to Set Up on Chyp</h1>
           <div className='create-cards-container'>
           {this.state.events.map( (event) => (
             <CreateCard event={event} key={event.id} />
           ))}
         </div>
       </div>
     );
    }
  }
}

export default Create;
