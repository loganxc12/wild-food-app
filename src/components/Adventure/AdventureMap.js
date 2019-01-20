import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Autocomplete from "react-google-autocomplete";

class AdventureMap extends Component {

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
                         <Marker/>
                         <Autocomplete
                              style={{width: '90%'}}
                              onPlaceSelected={(place) => {
                                   console.log(place);
                              }}
                              types={['(regions)']}
                              componentRestrictions={{country: "ru"}}
                         />
                    </Map>
               </div>
          );
     }
}

export default GoogleApiWrapper({ apiKey: "AIzaSyDbghkNREjZkEHjhLJZ7wjc4ePqLObSWz8" })(AdventureMap);
