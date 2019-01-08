import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { toggleAddSpeciesModal } from "../../ducks/reducer";
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

     postAdventureToServer() {
          const { title, date, location, description } = this.state;
          const newAdventure = { title, date, location, description };
          axios.post("/api/adventures", newAdventure).then(response => {
               this.setState({ redirect: true })
          })
     }

     render() {
          const { redirect, imageUrl, images, showModal } = this.state;
          // const { toggleAddSpeciesModal } = this.props;
          
          if (redirect) {
               return <Redirect to="/dash" />;
          }

          const previewImages = images.map(image => 
               <img src={image} className="preview-image" />
          )

          return (
               <div className="add-adventure-wrapper">
                    <AddSpeciesModal 
                         show={showModal}
                         hide={this.hideModal}
                    />
                    <div className="add-adventure-form">
                         <h1>Add a New Adventure</h1>
                         <p>Adventures are like journal entries, they're detailed field reports of your foraging trips: a place to capture the species, images and stories you gather in your local ecosystem. </p>
                         <input onChange={this.handleInputChange} name="title" placeholder="Title"></input>
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
                         <textarea rows="6" cols="70" onChange={this.handleInputChange} name="description" placeholder="Description"></textarea>
                         <button onClick={this.postAdventureToServer} className="general-button">Save</button>
                         <button onClick={this.toggleRedirect} className="general-button">Cancel</button>
                    </div>
               </div>
          );
     }

}

export default connect(null, { toggleAddSpeciesModal })(AddAdventure);