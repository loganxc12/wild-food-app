import React, { Component } from "react";

class AddSpeciesModal extends Component {
     constructor(props) {
          super(props);
          this.state = {
               name: "",
               scientificName: "",
               season: "",
               description: "",
               imageUrl: ""
          }
          this.handleInputChange = this.handleInputChange.bind(this);
          this.modalSubmit = this.modalSubmit.bind(this);
     }

     handleInputChange(e) {
          this.setState({
               [e.target.name] : e.target.value
          })
     }

     modalSubmit() {
          const { name, scientificName, season, description, imageUrl } = this.state;
          const { hide, addSpecies } = this.props;
          addSpecies(name, scientificName, season, description, imageUrl);
          hide();
     }

     render() {
          const { show, hide } = this.props;
          const showHideClassName = show ? "modal display-flex" : "modal display-none";
          return show ? (
               <div className={showHideClassName}>
                    <section className="modal-main">
                         <a className="modal-close-btn" onClick={hide}>X</a>
                         <h2>Add a New Species</h2>
                         <input onChange={this.handleInputChange} name="name" placeholder="Common Name"></input>
                         <input onChange={this.handleInputChange} name="scientificName" placeholder="Scientific name"></input>
                         <input onChange={this.handleInputChange} name="season" placeholder="Season"></input>
                         <input onChange={this.handleInputChange} name="description" placeholder="Description"></input>
                         <input onChange={this.handleInputChange} name="imageUrl" placeholder="Image URL"></input>
                         <button onClick={this.modalSubmit} className="general-button">Add Species</button>
                    </section>
               </div>
          ) : null;
     }
     
}

export default AddSpeciesModal;
