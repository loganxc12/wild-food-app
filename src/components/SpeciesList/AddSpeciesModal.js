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
          const { name, scientificName, season, description, imageUrl } = this.state;
          const { show, hide } = this.props;
          const showHideClassName = show ? "modal display-flex" : "modal display-none";
          return show ? (
               <div className={showHideClassName}>
                    <section className="modal-main">
                         <div className="modal-content">
                              <a onClick={hide}>X</a>
                              <header>
                                   <h2>ADD A NEW SPECIES</h2>
                                   <button>+ Upload Featured Image</button>
                              </header>
                              <form>
                                   <input onChange={this.handleInputChange} name="name" placeholder="Common Name"></input>
                                   <input onChange={this.handleInputChange} name="scientificName" placeholder="Scientific name"></input>
                                   <input onChange={this.handleInputChange} name="season" placeholder="Season"></input>
                                   <input onChange={this.handleInputChange} name="description" placeholder="Description"></input>
                                   <input onChange={this.handleInputChange} name="imageUrl" placeholder="Image URL"></input>
                              </form>
                              <button 
                                   onClick={ (name && scientificName && season && description && imageUrl) ? 
                                        this.modalSubmit : () => alert("Please fill out all fields to add a new species") } 
                                   className="general-button">Add Species
                              </button>
                         </div>
                    </section>
               </div>
          ) : null;
     }
     
}

export default AddSpeciesModal;
