import React, { Component } from 'react';
import PopUp from '../PopUp/popUp.js'

class CreateCard extends Component {

  handleClick(){
    <PopUp />
  }

  render() {

    const processed_name = this.props.event.name;
    const processed_street = !this.props.event.place || !this.props.event.place.location || !this.props.event.place.location.street ? '' : this.props.event.place.location.street;
    const processed_location = !this.props.event.place || !this.props.event.place.name ? 'Location Name Not Stated' : this.props.event.place.name;
    const processed_cover = !this.props.event.cover ? "https://x.kinja-static.com/assets/images/logos/placeholders/default.png" : this.props.event.cover.source;
    const processed_description = !this.props.event.description ? "No Description Has Been Added" : this.props.event.description;
    const processed_owner_name = !this.props.event.owner || !this.props.event.owner.name ? "Unknown" : this.props.event.owner.name;
    let myURL = "https://www.facebook.com/events/"+this.props.event.id+"/"
    const processed_date = new Date(this.props.event.start_time).toLocaleString('en-US')
    return (
      <div className="block-card">
        <img className = "cover-photo" key = {this.props.event.id + 'cover'} src = {processed_cover} height = '210' width = '400' alt = "Cover Photo"/>
          <div className="title-content">
            <h3><a href={myURL}  key = {this.props.event.id}>{processed_name}</a></h3>

              <div className="intro">
                <a key = {this.props.event.id}>{processed_location}</a><br></br>
                <a key = {this.props.event.id}>{processed_street}</a><br></br>
                <a key = {this.props.event.id}>{processed_date}</a>
              </div>
              <div className="card-info">
                <PopUp event={this.props.event}/>
              </div>
          </div>

      </div>
    );
  }

}

export default CreateCard;
