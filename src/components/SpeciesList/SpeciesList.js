import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateSpecies } from "../../ducks/reducer"; 
import AddSpeciesModal from "./AddSpeciesModal";
import SpeciesModal from "./SpeciesModal";

class SpeciesList extends Component {
     constructor(props) {
          super(props);
          this.state = {
               showAddModal: false,
               showSpeciesModal: false,
               modalSpecies: null 
          }
          this.postSpeciesToServer = this.postSpeciesToServer.bind(this);
          this.showModal = this.showModal.bind(this);
          this.hideModal = this.hideModal.bind(this);
     }

     postSpeciesToServer(name, scientificName, imageUrl, description) {
          const newSpecies = { name, scientificName, imageUrl, description };
          axios.post("/api/species", newSpecies).then(response => {
               console.log(response);
               const { species, updateSpecies } = this.props;
               updateSpecies([...species, response.data[0]]);
          })
     }

     showModal(modal, species) {
          this.setState({ 
               [modal]: true,
               modalSpecies: species
          })
     }

     hideModal(modal) {
          this.setState({ [modal]: false })
     }

     render() {
          //Pulling down species array from Redux and mapping over/conditionally rendering.
          const { showAddModal, showSpeciesModal, modalSpecies } = this.state;
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
                                   <div onClick={ () => this.showModal("showSpeciesModal", species) } className="list-item" style={speciesStyle}>
                                        <div className="title">
                                             <p>{species.scientific_name}</p>
                                             <h2>{species.name}</h2>
                                        </div>
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
                         addSpecies={this.postSpeciesToServer}
                    />
                    <SpeciesModal 
                         show={showSpeciesModal}
                         hide={this.hideModal}
                         modalSpecies={modalSpecies}
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