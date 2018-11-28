import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import './Events.css';
import ViewCard from '../View/ViewCard';
import firebase from '../../fire.js';

class Events extends Component {

  constructor(props) {
    super(props);
    this.state = { events: [], modal: true }
    this.getEventsInLocation = this.getEventsInLocation.bind(this);
    this.submitLocation = this.submitLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

    componentWillMount() {
        this.recents = firebase.database().ref('events').orderByKey().limitToLast(15).once('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ events: snapshot.val() })
        })
    }

   getEventsInLocation() {
      let ref = this.state.events;
      let events = [];
      Object.keys(ref).forEach(event_id => {
      let eventTime = new Date(ref[event_id].start_time).getTime();
      let currentTime = new Date().getTime();
      if ((eventTime >= currentTime) && ref[event_id].place != null) {
          if (!ref[event_id].place.location){
            if ((ref[event_id].place.name.indexOf(this.state.userLocation) >= 0)) {
              events.push(ref[event_id]);
            }
          }
          else {
            if ((ref[event_id].place.location.city.indexOf(this.state.userLocation) >= 0)) {
              events.push(ref[event_id]);
            }
          }
        }
      })
      return(events);
    }

    submitLocation() {
        this.setState({ userLocation: this.state.userInput, modal: false })
    }

    handleInputChange(evt) {
        this.setState({userInput: evt.target.value})
    }

  render() {
      const events = this.getEventsInLocation();
      return (
        <div>

          { this.state.userLocation ? (
            <div className="local">
              <h1 id="localTitle">Local Events</h1>
              <h2 id="open">Found events in {this.state.userLocation}</h2>
              <div className = "create-cards-container">
              {events.map( (event) => (
              <ViewCard event={event} key={event.id} />
              ))}
              </div>
            </div>
          ) : null }

          <Modal isOpen={this.state.modal} id='events-location'>
            <ModalHeader>{'Where are you?'}</ModalHeader>
            <ModalBody>
              <input className='form-control' onChange={this.handleInputChange} value={this.state.userInput} type='text' placeholder='Toronto'/>
              <button className='btn btn-success' onClick={this.submitLocation}>{'FIND EVENTS IN MY CITY'}</button>
            </ModalBody>
          </Modal>
        </div>

      )
  }
}

export default Events;
