import React, { Component } from "react";

class SpeciesModal extends Component {
     constructor(props) {
          super(props);
          this.handleInputChange = this.handleInputChange.bind(this);
     }

     handleInputChange(e) {
          this.setState({
               [e.target.name] : e.target.value
          })
     }

     render() {
          const { show, hide } = this.props;
          const showHideClassName = show ? "modal display-flex" : "modal display-none";
          return show ? (
               <div className={showHideClassName}>
                    <section className="modal-main">
                         <div className="modal-img">
                         </div>
                         <div className="species-content">
                              <a className="close-btn" onClick={ () => hide("showSpeciesModal") }>X</a>
                              <header>
                                   <h2>STINGING NETTLE</h2>
                              </header>
                              <section>
                              <p><strong>SCIENTIFIC NAME: </strong><span>Urtica dioica</span></p>
                              <p><strong>DESCRIPTION: </strong><span>Urtica dioica, often called common nettle, stinging nettle (although not all plants of this 
                                   species sting) or nettle leaf, is a herbaceous perennial flowering plant in the family Urticaceae.

                                   Urtica dioica, often called common nettle, stinging nettle (although not all plants of this species sting) or nettle leaf, is 
                                   a herbaceous perennial flowering plant in the family Urticaceae.</span></p>
                              </section>
                              <div className="settings-box">
                                   <div className="edit-delete-box">
                                        <div className="edit">EDIT</div>
                                        <div className="delete">DELETE</div>
                                   </div>
                                   <i className="fas fa-cog"></i>
                              </div>
                         </div>
                    </section>
               </div>
          ) : null;
     }
     
}

export default SpeciesModal;