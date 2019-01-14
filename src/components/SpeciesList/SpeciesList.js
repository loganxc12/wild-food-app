import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateSpecies } from "../../ducks/reducer";
import SpeciesModal from "./SpeciesModal";
import speciesMenu from "./eye.png";

class SpeciesList extends Component {
     constructor(props) {
          super(props);
          this.state = {
               showModal: false
          }
          this.getSpeciesFromServer = this.getSpeciesFromServer.bind(this);
          this.showModal = this.showModal.bind(this);
          this.hideModal = this.hideModal.bind(this);
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

     showModal() {
          this.setState({ showModal: true })
     }

     hideModal() {
          this.setState({ showModal: false})
     }

     render() {
          //Pulling down species array from Redux and mapping over/conditionally rendering.
          const { showModal } = this.state;
          const { species } = this.props;

          let speciesToDisplay;

          if (species !== null) {
               if (species.length) {
                    speciesToDisplay = species.map(species => {
                         let speciesStyle = {
                              background: `linear-gradient(rgba(33, 41, 51, 0.65), rgba(8, 38, 75, 0.65)),url('${species.image_url}')`,
                              backgroundSize: "cover",
                         }
                         return (
                              <div key={species.id} className="list-item-wrapper">
                                   <div className="list-item" style={speciesStyle}>
                                        <div className="title">
                                             <p>{species.scientific_name}</p>
                                             <h2>{species.name}</h2>
                                        </div>
                                        <img onClick={this.showModal} src={speciesMenu} className="eye-menu" />
                                   </div>
                              </div> 
                         );
                    });
               } else { speciesToDisplay = <h3>Looks like you haven't added any species yet.</h3> }
          } else { speciesToDisplay = <h3>Loading...</h3> }

          return (
               <div className="list-wrapper">
                    <SpeciesModal 
                         show={showModal}
                         hide={this.hideModal}
                         // addSpecies={this.addToSpeciesArray}
                    />
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