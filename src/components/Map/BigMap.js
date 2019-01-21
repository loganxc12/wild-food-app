import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

class BigMap extends Component {

     constructor(props) {
          super(props);
          this.state = {
               showingInfoWindow: false,  //Hides or the shows the infoWindow
               activeMarker: {},          //Shows the active marker upon click
               selectedPlace: {}      
          }
     }

     onMarkerClick = (props, marker, e) =>
          this.setState({
               selectedPlace: props,
               activeMarker: marker,
               showingInfoWindow: true
          });

     onClose = props => {
          if (this.state.showingInfoWindow) {
               this.setState({
                    showingInfoWindow: false,
                    activeMarker: null
               });
          }
     };

     render() {

          const mapStyles = {
               width: "100%",
               height: "100%"
          };

          return (
               <div className="map-container">
                    <Map
                         google={this.props.google}
                         zoom={10}
                         style={mapStyles}
                         initialCenter={{
                              lat: 33.4484,
                              lng: -112.0740
                         }}
                    >
                         <Marker
                              onClick={this.onMarkerClick}
                              name={'Kenyatta International Convention Centre'}
                         />
                         <InfoWindow
                              marker={this.state.activeMarker}
                              visible={this.state.showingInfoWindow}
                              onClose={this.onClose}
                         >
                              <div><h4>{this.state.selectedPlace.name}</h4></div>
                         </InfoWindow>
                    </Map>
               </div>
          );
     }
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_MAP_KEY })(BigMap);
