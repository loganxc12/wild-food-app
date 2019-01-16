import React, { Component } from "react";
import { connect } from "react-redux";

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
          const { show, hide, modalId, species } = this.props;
          const showHideClassName = show ? "modal display-flex" : "modal display-none";
          const speciesToDisplay = show ? species.filter(species => species.id === modalId)[0] : null;
          return show ? (
               <div className={showHideClassName}>
                    <section className="modal-main">
                         <div className="modal-img">
                              <img src={speciesToDisplay.image_url} alt="selected species" />
                         </div>
                         <div className="species-content">
                              <a className="close-btn" onClick={ () => hide("showSpeciesModal") }>X</a>
                              <header>
                                   <h2>{speciesToDisplay.name.toUpperCase()}</h2>
                              </header>
                              <section>
                              <p><strong>SCIENTIFIC NAME: </strong><span>{speciesToDisplay.scientific_name}</span></p>
                              <p><strong>DESCRIPTION: </strong><span>{speciesToDisplay.description}</span></p>
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

function mapStateToProps(reduxState) {
     const { species } = reduxState;
     return { species };
}

export default connect(mapStateToProps)(SpeciesModal);