import React, { Component } from "react";
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

    addToSpeciesArray(name, scientificName, imageUrl, description) {
        this.setState({
            species: [...this.state.species, { name, scientificName, imageUrl, description }]
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
        const { title, date, location, description, imageUrl, images, species, showModal, redirect } = this.state;
        const { user } = this.props;
        
        if (redirect) {
            return <Redirect to="/dash" />;
        }

        const previewImages = images.map( image => <img src={image} className="image-preview" alt="" /> );
        const previewSpecies = species.map( species => 
            <li>{species.name.toUpperCase()} <button className="delete-circle">X</button></li>
        );

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
                    <input onChange={this.handleInputChange} name="title" placeholder="Give your adventure a title (ex: Spring Foraging)"></input>
                    <input onChange={this.handleInputChange} name="location" placeholder="Add the Location"></input>
                    <input onChange={this.handleInputChange} name="date" placeholder="Date" type="date"></input>
                    {/* <div className="button-container">
                        <button>+ Add the Location</button>
                        <button>+ Add the Date</button>
                    </div> */}
                    <div className="image-upload-box">
                        <h2>ADD PHOTOS TO YOUR ADVENTURE</h2>
                        <div className="url-container">
                            <input onChange ={this.handleInputChange} name="imageUrl" placeholder="Enter Image URL" value={imageUrl} ></input>
                            <button onClick={this.addToImagesArray}>ADD PHOTO</button>
                        </div>
                        <div className="image-upload-progress">
                            { previewImages }
                            {/* <div className="image-preview">
                                <button className="delete-circle">X</button>
                            </div> */}
                        </div>
                    </div>
                    <div className="add-species-box">
                        <h2>SPECIES FOUND ON THIS ADVENTURE:</h2>
                        <div className="button-container">
                            <button><i className="fas fa-angle-down"></i> Choose from Species List</button>
                            <button onClick={this.showModal}>+ Add New Species</button>
                        </div>
                        <ul> { previewSpecies } </ul>
                    </div>
                    <h2>DESCRIPTION:</h2>
                    <textarea rows="12" cols="70" onChange={this.handleInputChange} name="description" placeholder="Write to your heart’s content about this foraging trip: where you went, what you found, essential gear you packed, new species you learned or discovered for the first time…"></textarea>
                    <div className="adventure-submit">
                        <button 
                            onClick={ (title && location && date && description && images.length && species.length) ? 
                                this.postAdventureToServer : () => alert("Please fill out all fields to add a new adventure") } 
                        > SAVE ADVENTURE
                        </button>
                    </div>
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

 {/* <input onChange={this.handleInputChange} name="location" placeholder="Location"></input>
     <input onChange={this.handleInputChange} name="date" placeholder="Date" type="date"></input> */}
{/*  <input onChange ={this.handleInputChange} name="imageUrl" placeholder="Image URL" value={imageUrl} ></input>
     <button onClick={this.addToImagesArray} className="general-button"><i className="fas fa-camera"></i>  Add Image To Adventure</button> */}
     // <div className="preview-images-wrapper">{previewImages}</div>
{/* <select>
     <option selected disabled>Choose a species from your Species List</option>
     <option value="Wild Leek">Wild Leek</option>
     <option value="Fiddleheads">Fiddleheads</option>
</select> */}
{/* <ul>{previewSpecies}</ul> */}
