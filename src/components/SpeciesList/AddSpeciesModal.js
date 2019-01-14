import React, { Component } from "react";

class AddSpeciesModal extends Component {
     constructor(props) {
          super(props);
          this.state = {
               name: "",
               scientificName: "",
               imageUrl: "",
               description: ""
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
          const { name, scientificName, imageUrl, description } = this.state;
          const { hide, addSpecies } = this.props;
          addSpecies(name, scientificName, imageUrl, description);
          hide();
     }

     render() {
          const { name, scientificName, description, imageUrl } = this.state;
          const { show, hide } = this.props;
          const showHideClassName = show ? "modal display-flex" : "modal display-none";
          return show ? (
               <div className={showHideClassName}>
                    <section className="modal-main">
                         <div className="modal-content">
                              <a className="close-btn" onClick={ () => hide("showAddModal") }>X</a>
                              <header>
                                   <h2>ADD A NEW SPECIES</h2>
                                   <button>+ Upload Featured Image</button>
                              </header>
                              <form>
                                   <input onChange={this.handleInputChange} name="name" placeholder="Common Name"></input>
                                   <input onChange={this.handleInputChange} name="scientificName" placeholder="Scientific name"></input>
                                   <input onChange={this.handleInputChange} name="imageUrl" placeholder="Image URL"></input>
                                   <textarea onChange={this.handleInputChange} name="description" placeholder="Description (habitat, identification, recipes, look-alikes…)"></textarea>
                              <button 
                                   onClick={ (name && scientificName && description && imageUrl) ? 
                                        this.modalSubmit : () => alert("Please fill out all fields to add a new species") } 
                              >SAVE SPECIES
                              </button>
                              </form>
                         </div>
                    </section>
               </div>
          ) : null;
     }
     
}

export default AddSpeciesModal;
