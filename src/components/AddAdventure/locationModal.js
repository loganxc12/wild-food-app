import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import Autocomplete from "react-google-autocomplete";
import AdventureMap from "../Adventure/AdventureMap";

class LocationModal extends Component {
     constructor(props) {
          super(props);
          this.state = {
               location: {
                    lat: "33.4484",
                    lng: "-112.0740",
                    name: "Phoenix, AZ, USA"
               }
          }
          this.handleInputChange = this.handleInputChange.bind(this);
          this.setLocation = this.setLocation.bind(this);
          this.modalSubmit = this.modalSubmit.bind(this);
     }

     componentDidUpdate(prevProps) {
          if (this.props.savedLocation && (this.props !== prevProps)) {
               this.setState({ location: this.props.savedLocation })
          }
     }

     handleInputChange(e) {
          this.setState({ [e.target.name] : e.target.value })
     }

     setLocation(place) {
          let location = Object.assign({}, this.state.location);
          location.lat = place.geometry.location.lat();
          location.lng = place.geometry.location.lng();
          location.name = place.formatted_address;
          this.setState({ location });
     }

     modalSubmit() {
          const { location } = this.state;
          const { hide, updateLocation } = this.props;
          updateLocation("location", location);
          hide("showLocationModal");
     }

     render() {
          const { location } = this.state;
          const { show, hide } = this.props;
          const showHideClassName = show ? "modal display-flex" : "modal display-none";
          return show ? (
               <div className={showHideClassName}>
                    <section className="location-modal-main">
                         <div className="modal-content">
                              <a className="close-btn" onClick={ () => hide("showLocationModal") }>X</a>
                              <header>
                                   <h2>ADD THE LOCATION</h2>
                                   <p>Search for a location name or address. If you can't find the place you're looking for, enter a location nearby and drag the pin to the approximate location.</p>
                                   <Autocomplete
                                        style={{width: '90%'}}
                                        onPlaceSelected={this.setLocation}
                                        types={['(regions)']}
                                   />
                              </header>
                              <div className="location-picker">
                                   <AdventureMap
                                        location={location}
                                   />
                              </div>
                              <button 
                                   onClick={ location ? this.modalSubmit : () => alert("Please add a location") } 
                              >SAVE SPOT
                              </button>
                         </div>
                    </section>
               </div>
          ) : null;
     }
     
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_MAP_KEY })(LocationModal);
