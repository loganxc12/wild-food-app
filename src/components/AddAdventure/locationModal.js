import React, { Component } from "react";

class LocationModal extends Component {
     constructor(props) {
          super(props);
          this.state = {
               location: ""
          }
          this.handleInputChange = this.handleInputChange.bind(this);
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

     modalSubmit() {
          const { location } = this.state;
          const { hide, updateLocation } = this.props;
          updateLocation("location", location);
          this.setState({ location: "" })
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
                                   <input onChange={this.handleInputChange} name="location" value={location ? location : null} placeholder="Spot Name"></input>
                              </header>
                              <div className="location-picker">
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

export default LocationModal;
