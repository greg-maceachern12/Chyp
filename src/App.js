import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements';

// styles
import './App.css';

// Our components
import Header from "./components/Header/Header.js"
import Events from "./components/Events/Events.js"
import Create from "./components/Create/Create.js"
import About from "./components/About/About.js"
import LandingPage from './components/LandingPage/LandingPage.js'
import EventPage from "./components/EventPage/EventPage.js"
import StripeComplete from './components/StripeComplete/StripeComplete.js'

class App extends Component {

  render() {
    return (
      <StripeProvider apiKey='pk_test_A0LpMIzhxR1Bq9kEObSdJJFa'>
        <Router>
          <div classhost="App" id='App-container'>
            <Header />
            <main>
              <Route exact path="/" render={(props) => (
                <LandingPage /> )}/>
              <Route exact path="/events" render={(props) => (
                <Events {...props} /> )}/>
              <Route exact path="/about" render={(props) => (
                <About {...props} /> )}/>
              <Route exact path= "/create" render={(props) => (
                <Create {...props}/> )}/>
              <Route exact path='/event' render={ (props) => (
                <EventPage {...props} /> )} />
              <Route exact path='/stripe-complete' render={ (props) => (
                <StripeComplete {...props} /> )} />
              </main>
          </div>
        </Router>
      </StripeProvider>
    );
  }
}


export default App;
