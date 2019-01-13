import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateSpecies } from "../../ducks/reducer";
import speciesMenu from "./eye.png";

class SpeciesList extends Component {
     constructor(props) {
          super(props);
          this.getSpeciesFromServer = this.getSpeciesFromServer.bind(this);
     }

     componentDidMount() {
          this.getSpeciesFromServer();
     }

     getSpeciesFromServer() {
          axios.get("/api/species").then(response => {
               const { updateSpecies } = this.props;
               updateSpecies(response.data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
          })
     }

     render() {
          //Pulling down species array from Redux and mapping over/conditionally rendering.
          const { species } = this.props;
          let speciesToDisplay;
          if (species !== null) {
               if (species.length) {
                    speciesToDisplay = species.map(el => 
                         <div key={el.id} className="list-item">
                              <div className="title">
                                   <p>{el.scientific_name}</p>
                                   <h2>{el.name}</h2>
                              </div>
                              <img src={speciesMenu} className="eye-menu" />
                         </div> 
                    );
               } else { speciesToDisplay = <h3>Looks like you haven't added any species yet.</h3> }
          } else { speciesToDisplay = <h3>Loading...</h3> }

          return (
               <div className="list-wrapper">
                    { speciesToDisplay }
               </div>
          );
     }
     
}

function mapStateToProps(reduxState) {
     const { species } = reduxState;
     return { species };
}

export default connect(mapStateToProps, { updateSpecies })(SpeciesList);