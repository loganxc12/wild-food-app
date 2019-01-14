import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateSpecies } from "../../ducks/reducer";
import AddSpeciesModal from "./AddSpeciesModal";
import SpeciesModal from "./SpeciesModal";
import speciesMenu from "./eye.png";

class SpeciesList extends Component {
     constructor(props) {
          super(props);
          this.state = {
               showAddModal: false,
               showSpeciesModal: false
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

     showModal(modal) {
          this.setState({ [modal]: true })
     }

     hideModal(modal) {
          this.setState({ [modal]: false})
     }

     render() {
          //Pulling down species array from Redux and mapping over/conditionally rendering.
          const { showAddModal, showSpeciesModal } = this.state;
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
                                        <img onClick={ () => this.showModal("showSpeciesModal") } src={speciesMenu} className="eye-menu" />
                                   </div>
                              </div> 
                         );
                    });
               } else { speciesToDisplay = <h3>Looks like you haven't added any species yet.</h3> }
          } else { speciesToDisplay = <h3>Loading...</h3> }

          return (
               <div className="list-wrapper">
                    <AddSpeciesModal 
                         show={showAddModal}
                         hide={this.hideModal}
                    />
                    <SpeciesModal 
                         show={showSpeciesModal}
                         hide={this.hideModal}
                         // addSpecies={this.addToSpeciesArray}
                    />
                    { speciesToDisplay }
                    <i onClick={ () => this.showModal("showAddModal")} className="fas fa-plus-circle"></i>
               </div>
          );
     }
     
}

function mapStateToProps(reduxState) {
     const { species } = reduxState;
     return { species };
}

export default connect(mapStateToProps, { updateSpecies })(SpeciesList);