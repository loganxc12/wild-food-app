import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import AddSpeciesModal from "../SpeciesList/AddSpeciesModal";
import LocationModal from "./locationModal";

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
            showAddModal: false,
            showLocationModal: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateStateVal = this.updateStateVal.bind(this);
        this.toggleRedirect = this.toggleRedirect.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.addToImagesArray = this.addToImagesArray.bind(this);
        this.addToSpeciesArray = this.addToSpeciesArray.bind(this);
        this.postAdventureToServer = this.postAdventureToServer.bind(this);
    }

    handleInputChange(e) {
        this.setState({ [e.target.name] : e.target.value })
    }

    updateStateVal(prop, val) {
        this.setState({ [prop]: val })
    }

    toggleRedirect() {
        this.setState({ redirect: true })
    }

    showModal(modal) {
        this.setState({ [modal]: true })
   }

   hideModal(modal) {
        this.setState({ [modal]: false })
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

    deleteFromArray(prop, index) {
        let updatedArray = this.state[prop].filter( (e, i) => i !== index );
        this.setState({ [prop]: updatedArray });
    }

    postAdventureToServer() {
        const { title, date, location, description, images, species } = this.state;
        const newAdventure = { title, date, location, description, images, species };
        axios.post("/api/adventures", newAdventure).then(response => {
            this.setState({ redirect: true })
        })
    }

    render() {
        const { title, date, location, description, imageUrl, images, species, showAddModal, showLocationModal, redirect } = this.state;

        if (redirect) {
            return <Redirect to="/dash" />;
        }

        const previewImages = images.map( (image, i) => {
            return (
                <div key={i} className="image-preview" style={{backgroundImage: `url(${image})`, backgroundSize: "cover"}}>
                    <button onClick={() => this.deleteFromArray("images", i)} className="delete-circle">X</button>
                </div>
            )
        });

        const previewSpecies = species.map( (species, i) => 
            <li onClick={() => this.showModal("showAddModal")}>
                {species.name.toUpperCase()} <button onClick={() => this.deleteFromArray("species", i)} className="delete-circle">X</button>
            </li>
        );

        const completedStyle = { backgroundColor: "rgba(90, 210, 152, 0.555)" };       
        const uploadBarStyle = images.length ? { display: "flex" } : { display: "none" };

        return (
            <div className="add-adventure-wrapper">
                <LocationModal
                    show={showLocationModal}
                    hide={this.hideModal}
                    updateLocation={this.updateStateVal}
                    savedLocation={location}
                />
                <AddSpeciesModal 
                    show={showAddModal}
                    hide={this.hideModal}
                    addSpecies={this.addToSpeciesArray}
                />
                <div className="add-adventure-form">
                    <h1>ADD A NEW ADVENTURE</h1>
                    <p>Adventures are like journal entries, they're detailed field reports of your foraging trips: a place to capture the species, images and stories you gather in your local ecosystem. </p>
                    <input onChange={this.handleInputChange} name="title" placeholder="Give your adventure a title (ex: Spring Foraging)"></input>
                    <div className="button-container">
                        <button 
                            onClick={() => this.showModal("showLocationModal")} 
                            style={ location ? completedStyle : null } >
                            {location ? location : "+ Add the Location"}
                        </button>
                        <button 
                            className="date-picker"
                            style={ date ? completedStyle : null }>
                            Add the date:<input onChange={this.handleInputChange} type="date" name="date"></input>
                        </button>
                    </div>
                    <div className="image-upload-box">
                        <h2>ADD PHOTOS TO YOUR ADVENTURE</h2>
                        <div className="url-container">
                            <input onChange ={this.handleInputChange} name="imageUrl" placeholder="Enter Image URL" value={imageUrl} ></input>
                            <button onClick={this.addToImagesArray}>ADD PHOTO</button>
                        </div>
                        <div className="image-upload-progress" style={uploadBarStyle}>
                            { previewImages }
                        </div>
                    </div>
                    <div className="add-species-box">
                        <h2>SPECIES FOUND ON THIS ADVENTURE:</h2>
                        <div className="button-container">
                            <button><i className="fas fa-angle-down"></i> Choose from Species List</button>
                            <button onClick={() => this.showModal("showAddModal")}>+ Add New Species</button>
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
