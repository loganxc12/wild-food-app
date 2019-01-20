import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; 
import { updateSpecies } from "../../ducks/reducer"; 
import "react-confirm-alert/src/react-confirm-alert.css"; 

class SpeciesModal extends Component {

     constructor(props) {
          super(props);
          this.state = {
               selectedSpecies: null,
               edit: false
          }
          this.handleInputChange = this.handleInputChange.bind(this);
          this.toggleEdit = this.toggleEdit.bind(this);
          this.handleModalClose = this.handleModalClose.bind(this);
          this.deleteSpeciesFromServer = this.deleteSpeciesFromServer.bind(this);
          this.updateSpeciesOnServer = this.updateSpeciesOnServer.bind(this);
          this.confirmDelete = this.confirmDelete.bind(this);
     }

     componentDidUpdate(prevProps) {
          if (this.props.modalSpecies && (this.props !== prevProps)) {
               this.setState({ selectedSpecies: this.props.modalSpecies })
          }
     }

     handleInputChange(e) {
          this.setState({
               selectedSpecies: {
                    ...this.state.selectedSpecies,
                    [e.target.name]: e.target.value
               }
          })
     }

     toggleEdit() {
          let editState = this.state.edit;
          this.setState({ edit: !editState })
     } 

     handleModalClose() {
          this.setState({ edit: false });
          this.props.hide("showSpeciesModal");
     }

     deleteSpeciesFromServer(id) {
          axios.delete(`/api/species/${id}`).then(response => {
               const { updateSpecies } = this.props;
               this.props.hide("showSpeciesModal");
               updateSpecies(response.data);
          })
     }

     updateSpeciesOnServer(id) {
          const { name, scientific_name, image_url, description } = this.state.selectedSpecies;
          const updatedSpecies = { name, scientific_name, image_url, description };
          axios.put(`/api/species/${id}`, updatedSpecies).then(response => {
               const { updateSpecies } = this.props;
               const updatedSelectedSpecies = response.data.filter(species => species.id === id)[0];
               updateSpecies(response.data);
               this.setState({ 
                    selectedSpecies: updatedSelectedSpecies
               })
               this.toggleEdit();
          })
     }

     confirmDelete(id) {
          confirmAlert({
            title: "Confirm",
            message: "Are you sure you want to permenently delete this species from your Species List and from all the adventures it's associated with?",
            buttons: [
              {
                label: "Yes",
                onClick: () => this.deleteSpeciesFromServer(id)
              },
              {
                label: "No",
                onClick: () => console.log("clicked no")
              }
            ]
          })
     }

     render() {
          const { edit, selectedSpecies } = this.state;
          const { show, modalSpecies, species } = this.props;
          const showHideClassName = show ? "modal display-flex" : "modal display-none";
          const speciesToDisplay = show ? species.filter(species => species.id === modalSpecies.id)[0] : null;

          if (show) {
               return edit ? (
                    <div className={showHideClassName}>
                         <section className="modal-main">
                              <a className="close-btn" onClick={this.handleModalClose}>X</a>
                              <div className="modal-img">
                                   <img src={speciesToDisplay.image_url} alt="selected species" />
                              </div>
                              <div className="species-content">
                                   <header>
                                        <h2>{speciesToDisplay.name.toUpperCase()}</h2>
                                   </header>
                                   <section>
                                        <p><strong>SCIENTIFIC NAME: </strong></p>                                   
                                        <input onChange={this.handleInputChange} value={selectedSpecies.scientific_name} name="scientific_name"></input>                                   
                                        <p><strong>DESCRIPTION: </strong></p>
                                        <textarea onChange={this.handleInputChange} value={selectedSpecies.description} name="description"></textarea>                                   
                                   </section>
                                   <div className="update-cancel">
                                        <div onClick={() => this.updateSpeciesOnServer(speciesToDisplay.id)}>SAVE</div>
                                        <div onClick={this.toggleEdit} className="cancel">CANCEL</div>
                                   </div>
                              </div>
                         </section>
                    </div>
               ) : (
                    <div className={showHideClassName}>
                         <section className="modal-main">
                              <a className="close-btn" onClick={this.handleModalClose}>X</a>
                              <div className="modal-img">
                                   <img src={speciesToDisplay.image_url} alt="selected species" />
                              </div>
                              <div className="species-content">
                                   <header>
                                        <h2>{speciesToDisplay.name.toUpperCase()}</h2>
                                   </header>
                                   <section>
                                        <p><strong>SCIENTIFIC NAME: </strong><span>{speciesToDisplay.scientific_name}</span></p>
                                        <p><strong>DESCRIPTION: </strong><span>{speciesToDisplay.description}</span></p>
                                   </section>
                                   <div className="edit-delete-box">
                                             <div onClick={this.toggleEdit} className="edit">EDIT</div>
                                             <div onClick={() => this.confirmDelete(speciesToDisplay.id)} className="delete">DELETE</div>
                                   </div>
                                   <i className="fas fa-cog"></i>
                              </div>
                         </section>
                    </div>
               )
          } else {
               return null;
          }
          
     }
     
}

function mapStateToProps(reduxState) {
     const { species } = reduxState;
     return { species };
}

export default connect(mapStateToProps, { updateSpecies })(SpeciesModal);