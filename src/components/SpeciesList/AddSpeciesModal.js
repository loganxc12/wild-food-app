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
          this.resetState = this.resetState.bind(this);
          this.modalClose = this.modalClose.bind(this);
          this.modalSubmit = this.modalSubmit.bind(this);
     }

     componentDidUpdate(prevProps) {
          if (this.props.modalSpecies && (this.props !== prevProps)) {
               const { name, scientificName, imageUrl, description } = this.props.modalSpecies;
               this.setState({ name, scientificName, imageUrl, description });
          }
     }

     handleInputChange(e) {
          this.setState({
               [e.target.name] : e.target.value
          })
     }

     resetState() {
          for (var prop in this.state) { this.setState({ [prop]: "" }) };
     }

     modalClose() {
          const { hide } = this.props;
          this.resetState();
          hide("showAddModal");
     }

     modalSubmit() {
          const { name, scientificName, imageUrl, description } = this.state;
          const { hide, addSpecies } = this.props;
          addSpecies(name, scientificName, imageUrl, description);
          this.resetState();
          hide("showAddModal");
     }

     render() {
          const { name, scientificName, imageUrl, description } = this.state;
          const { show, hide } = this.props;
          const showHideClassName = show ? "modal display-flex" : "modal display-none";
          return show ? (
               <div className={showHideClassName}>
                    <section className="modal-main">
                         <div className="modal-content">
                              <a className="close-btn" onClick={this.modalClose}>X</a>
                              <header>
                                   <h2>ADD A NEW SPECIES</h2>
                                   <button>+ Upload Featured Image</button>
                              </header>
                              <form>
                                   <input onChange={this.handleInputChange} name="name" value={name} placeholder="Common Name"></input>
                                   <input onChange={this.handleInputChange} name="scientificName" value={scientificName} placeholder="Scientific name"></input>
                                   <input onChange={this.handleInputChange} name="imageUrl" value={imageUrl} placeholder="Image URL"></input>
                                   <textarea onChange={this.handleInputChange} name="description" value={description} placeholder="Description (habitat, identification, recipes, look-alikes…)"></textarea>
                              <button 
                                   onClick={ (name && scientificName && imageUrl && description) ? 
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
