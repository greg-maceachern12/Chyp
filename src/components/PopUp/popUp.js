import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./popUp.css"
import fire from '../../fire.js';
import { withRouter } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      submitted: false,
      price: 0,
      amount: 0,
      stage: 'price'
    };

    this.toggle = this.toggle.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value

    });
  }

  submitEvent() {
    let event_data = this.props.event;
    event_data.max_tickets = this.state.amount;
    event_data.price = this.state.price;
    const newRef = fire.database().ref('events/' + this.props.event.id).set(event_data).then( () => {
      this.setState({
        stage: 'stripe'
      })
    });
    document.getElementsByClassName('modal-footer')[0].remove();
    document.getElementsByClassName('modal-title')[0].innerHTML = "Connect Your Bank Account";
  }

  render() {
    return (
      <div>
        <button className = 'btn btn-success' id="Create" style = {{backgroundColor:'#00CC89'}} onClick={this.toggle}>Add To Chyp!</button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{'Set a Ticket Price for this Event!'}</ModalHeader>
          <ModalBody id = "information">

             { this.state.stage === 'price'

              ? <div> <InputGroup>
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">$</span>
                    </div>
                    <Input name = "price" type="number" step="1" onChange={this.handleChange} placeholder="Ticket Price (CAD)" />
                </InputGroup><br></br>
                <Input name = "amount" type="number" step="1" onChange={this.handleChange} placeholder="Tickets Available (Leave Blank For Unlimited)" /></div>
              : <div><p><a href={"https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_CRiyeuFWnWEukuvXDGVIDP7ggGdMbm5r&scope=read_write&state=" + fire.auth().currentUser.uid + "event" + this.props.event.id} className="stripe-connect"><span>{'Connect with Stripe'}</span></a></p><p>Please add your bank account to Stripe so that we can send you your ticket sales.</p></div>
             }

          </ModalBody>
          { this.state.submitted ? null :
            <ModalFooter>
              <Button style={{ backgroundColor: "#00CC89" }} onClick={this.submitEvent}>Confirm and Add to Chyp</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Back to Events</Button>
            </ModalFooter>
          }
        </Modal>
      </div>
    );
  }
}

export default withRouter(ModalExample);
