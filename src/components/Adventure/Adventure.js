import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updateAdventures } from "../../ducks/reducer"; 
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css"; 
import SpeciesModal from "../SpeciesList/SpeciesModal";
import ImageSlider from "./ImageSlider/ImageSlider";
import AdventureMap from "./AdventureMap";

class Adventure extends Component {

     constructor(props) {
          super(props);
          this.state = {
               adventure: null,
               species: [],
               showSpeciesModal: false,
               showImageSlider: false,
               modalSpecies: null,
               redirect: false
          }
          this.getSingleAdventureFromServer = this.getSingleAdventureFromServer.bind(this);
          this.showModal = this.showModal.bind(this);
          this.hideModal = this.hideModal.bind(this);
          this.confirmDelete = this.confirmDelete.bind(this);
     }

     componentDidMount() {
          const { id } = this.props.match.params;
          this.getSingleAdventureFromServer(id);
     }

     getSingleAdventureFromServer(id) {
          axios.get(`/api/adventures/${id}`).then(response => {
               console.log(response);
               this.setState({
                    adventure: response.data.adventures[0],
                    species: response.data.species
               })
          })
     }

     showModal(modal, species) {
          this.setState({ 
               [modal]: true,
               modalSpecies: species
          })
     }

     hideModal(modal) {
          this.setState({ [modal]: false})
     }

     deleteAdventureFromServer(id) {
          axios.delete(`/api/adventures/${id}`).then(response => {
               console.log(response);
               const { updateAdventures } = this.props;
               updateAdventures(response.data);
               this.setState({ redirect: true });
          })
     }

     confirmDelete(id) {
          confirmAlert({
            title: "Confirm",
            message: "Are you sure you want to permenently delete this adventure?",
            buttons: [
              {
                label: "Yes",
                onClick: () => this.deleteAdventureFromServer(id)
              },
              {
                label: "No",
                onClick: () => console.log("Clicked No")
              }
            ]
          })
     }

     render() {
          const { adventure, species, showSpeciesModal, showImageSlider, modalSpecies, redirect } = this.state;

          if (redirect) {
               return <Redirect to="/dash" />;
          }
          
          let adventureStyle = adventure ? {
               background: `linear-gradient(rgba(33, 41, 51, 0.55), rgba(8, 38, 75, 0.55)),url('${adventure.images[0]}')`,
               backgroundSize: "cover",
          } : null;

          const adventureToDisplay = adventure ? (
               <div className="adventure-wrapper">
                    <SpeciesModal 
                         show={showSpeciesModal}
                         hide={this.hideModal}
                         modalSpecies={modalSpecies}
                    />
                    <ImageSlider
                         show={showImageSlider}
                         hide={this.hideModal}
                         images={adventure.images}
                    />
                    <div className="adventure-hero" style={adventureStyle}>
                         <div className="adventure-title-wrapper">
                              <h1>{adventure.title.toUpperCase()}</h1>
                              <div className="adventure-details">
                                   <h3>{moment(adventure.date).format("MMMM Do YYYY")}</h3>
                                   <h3><i className="fas fa-map-marker-alt"></i> {adventure.location.name}</h3>
                              </div>
                              <div className="adventure-photos">
                                   <button>+ ADD PHOTOS</button>
                                   <h3 onClick={() => this.showModal("showImageSlider")}><i className="fas fa-image"></i> SEE ALL PHOTOS</h3>
                              </div>
                         </div>
                    </div>
                    <div className="adventure-overview">
                         <div className="species-box">
                              <div className="species-box-content">
                                   <h2>SPECIES FOUND ON THIS ADVENTURE:</h2>
                                   <ul>
                                        { species.map(el => 
                                             <div key={el.id} onClick={() => this.showModal("showSpeciesModal", el)}>
                                                  <li>{el.name.toUpperCase()} <i className="fas fa-long-arrow-alt-right"></i></li>
                                             </div>
                                        ) }
                                   </ul>
                              </div>
                         </div>
                         <div className="map-box">
                              <div className="map-preview">
                                   <AdventureMap 
                                        location={adventure.location}
                                   />
                              </div>
                         </div>
                    </div>
                    <div className="description-box">
                         <div className="description-box-content">
                              <h2>DESCRIPTION:</h2>
                              <p>{adventure.description}</p>                         
                         </div>
                    </div>
                    <div className="settings-box">
                         <div className="edit-delete-box">
                              <div className="edit">EDIT</div>
                              <div onClick={() => this.confirmDelete(adventure.id)} className="delete">DELETE</div>
                         </div>
                         <i className="fas fa-cog"></i>
                    </div>
                    <div className="footer"></div>               
               </div>
          ) : null;

          return adventureToDisplay;
     }
     
}

export default connect(null, { updateAdventures })(Adventure);