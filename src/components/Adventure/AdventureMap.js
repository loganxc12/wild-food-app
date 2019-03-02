import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

function AdventureMap(props) {

    const { lat, lng } = props.location;
    const mapStyles = { width: "100%", height: "100%" };

    return (
        <div className="map-container">
            <Map
                google={props.google}
                zoom={11}
                style={mapStyles}
                initialCenter={{ lat, lng }}
                center={{ lat, lng }}
            >
                <Marker position={{ lat, lng }} />
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_MAP_KEY })(AdventureMap);
