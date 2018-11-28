import React, { Component } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"
const MAP_STYLES = require('./map_styles.json');

class EventMap extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{lat: this.props.lat, lng: this.props.lng}}
        defaultOptions={{ styles: MAP_STYLES }}
      >
        <Marker position={{lat: this.props.lat, lng: this.props.lng}} />
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(EventMap));
