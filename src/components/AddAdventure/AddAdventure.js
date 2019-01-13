import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import AddSpeciesModal from "../SpeciesList/AddSpeciesModal";

class AddAdventure extends Component {

     constructor(props) {
          super(props);
          this.state = {
               title: "",
               date: "",
               location: "",
               description: "",
               imageUrl: "",
               images: [],
               species: [],
               redirect: false,
               showModal: false
          }
          this.handleInputChange = this.handleInputChange.bind(this);
          this.toggleRedirect = this.toggleRedirect.bind(this);
          this.showModal = this.showModal.bind(this);
          this.hideModal = this.hideModal.bind(this);
          this.addToImagesArray = this.addToImagesArray.bind(this);
          this.addToSpeciesArray = this.addToSpeciesArray.bind(this);
          this.postAdventureToServer = this.postAdventureToServer.bind(this);
     }

     handleInputChange(e) {
          this.setState({
               [e.target.name] : e.target.value
          })
     }

     toggleRedirect() {
          this.setState({ redirect: true })
     }

     showModal() {
          this.setState({ showModal: true })
     }

     hideModal() {
          this.setState({ showModal: false})
     }

     addToImagesArray() {
          const imageToAdd = this.state.imageUrl;
          this.setState({
               images: [...this.state.images, imageToAdd],
               imageUrl: ""
          })
     }

     addToSpeciesArray(name, scientificName, season, description, imageUrl) {
          this.setState({
               species: [...this.state.species, { name, scientificName, season, description, imageUrl }]
          })
     }

     postAdventureToServer() {
          const { title, date, location, description, images, species } = this.state;
          const newAdventure = { title, date, location, description, images, species };
          axios.post("/api/adventures", newAdventure).then(response => {
               this.setState({ redirect: true })
          })
     }

     render() {
          const { title, date, location, description, redirect, imageUrl, images, species, showModal } = this.state;
          const { user } = this.props;
          
          if (redirect) {
               return <Redirect to="/dash" />;
          }

          const previewImages = images.map( image => <img src={image} className="preview-image" alt="" /> );
          const previewSpecies = species.map( species => 
               <li>{species.name}</li>
          )

          return (
               <div className="add-adventure-wrapper">
                    <AddSpeciesModal 
                         show={showModal}
                         hide={this.hideModal}
                         addSpecies={this.addToSpeciesArray}
                    />
                    <div className="add-adventure-form">
                         <h1>ADD A NEW ADVENTURE</h1>
                         <p>Adventures are like journal entries, they're detailed field reports of your foraging trips: a place to capture the species, images and stories you gather in your local ecosystem. </p>
                              <input onChange={this.handleInputChange} name="title" placeholder="Give your adventure a title (ex: Spring Foraging)" className="input-box"></input>
                              <input onChange={this.handleInputChange} name="location" placeholder="Location"></input>
                              <input onChange={this.handleInputChange} name="date" placeholder="Date" type="date"></input>
                              <div className="image-form-wrapper">
                                   <input onChange ={this.handleInputChange} name="imageUrl" placeholder="Image URL" value={imageUrl} ></input>
                                   <button onClick={this.addToImagesArray} className="general-button"><i className="fas fa-camera"></i>  Add Image To Adventure</button>
                              </div>
                              <div className="preview-images-wrapper">{previewImages}</div>
                              <select>
                                   <option selected disabled>Choose a species from your Species List</option>
                                   <option value="Wild Leek">Wild Leek</option>
                                   <option value="Fiddleheads">Fiddleheads</option>
                              </select>
                              <button onClick={this.showModal} className="general-button"><i className="fas fa-leaf"></i>  Add a New Species</button>
                              <ul>{previewSpecies}</ul>
                              <textarea rows="6" cols="70" onChange={this.handleInputChange} name="description" placeholder="Description"></textarea>
                              <button 
                                   onClick={ (title && location && date && description && images.length && species.length) ? 
                                        this.postAdventureToServer : () => alert("Please fill out all fields to add a new adventure") } 
                                   className="general-button"> Save
                              </button>
                              <button onClick={this.toggleRedirect} className="general-button">Cancel</button>
                    </div>
               </div>
          );
     }

}

function mapStateToProps(reduxState) {
     const { user } = reduxState;
     return { user };
}

export default connect(mapStateToProps)(AddAdventure);
