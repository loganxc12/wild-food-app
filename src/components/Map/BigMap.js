import React, { Component } from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

class BigMap extends Component {

     constructor(props) {
          super(props);
          this.state = {
               showingInfoWindow: false, 
               activeMarker: {},
               selectedPlace: null
          }
     }

     onMarkerClick = (props, marker) =>
          this.setState({
               selectedPlace: props,
               activeMarker: marker,
               showingInfoWindow: true
          });

     onClose = () => {
          if (this.state.showingInfoWindow) {
               this.setState({
                    showingInfoWindow: false,
                    activeMarker: null
               });
          }
     };

     render() {
          const { selectedPlace } = this.state;
          const { adventures } = this.props;
          const mapStyles = {
               width: "100%",
               height: "100%"
          };
          
          return (
               <div className="big-map-container">
                    <Map
                         google={this.props.google}
                         zoom={4}
                         style={mapStyles}
                         initialCenter={{ lat: 39.8283, lng: -98.5795 }}
                    >
                         {
                              adventures ?
                              adventures.map(adventure => {
                                   return (
                                        <Marker 
                                             key={adventure.id}
                                             position={{ lat: adventure.location.lat, lng: adventure.location.lng }}
                                             onClick={this.onMarkerClick}
                                             adventure={adventure}
                                        />
                                   );
                              })
                              : null
                         }
                        
                         <InfoWindow
                              marker={this.state.activeMarker}
                              visible={this.state.showingInfoWindow}
                              onClose={this.onClose}
                         >
                              <div>
                                   {
                                        selectedPlace ?
                                        <a href={`/adventure/${selectedPlace.adventure.id}`} style={{textTransform: "uppercase", color: "#292929", fontFamily: "Montserrat"}}>
                                             {selectedPlace.adventure.title} 
                                        </a>
                                        : null
                                   }
                              </div>
                         </InfoWindow>
                    </Map>
                    
               </div>
          );
     }
}

function mapStateToProps(reduxState) {
     const { adventures } = reduxState;
     return { adventures };
}

const wrappedMap = GoogleApiWrapper({ apiKey: process.env.REACT_APP_MAP_KEY })(BigMap);
export default connect(mapStateToProps)(wrappedMap);

