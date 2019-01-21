import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class AdventureMap extends Component {

     render() {

          const { lat, lng } = this.props.location;

          const mapStyles = {
               width: "100%",
               height: "100%"
          };

          return (
               <div className="map-container">
                    <Map
                         google={this.props.google}
                         zoom={11}
                         style={mapStyles}
                         //PASS COORDINATES FOR EACH ANDVENTURE AS OBJECT AND PROVIDE TO initialCenter
                         // InitialCenter={{ lat: 40.854885, lng: -88.081807 }}
                         initialCenter={{ lat, lng }}
                         center={{ lat, lng }}
                    >
                         <Marker
                              position={{ lat, lng }}
                         />
                    </Map>
               </div>
          );
     }
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_MAP_KEY })(AdventureMap);
