import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleAddSpeciesModal } from "../../ducks/reducer";

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
     }

     render() {
          const { show, hide } = this.props;
          const showHideClassName = show ? "modal display-flex" : "modal display-none";
          return show ? (
               <div className={showHideClassName}>
                    <section className="modal-main">
                    <button onClick={hide}>Close</button>
                    </section>
               </div>
          ) : null;
     }
     
}

function mapStateToProps(reduxState) {
     const { showAddSpeciesModal } = reduxState;
     return { showAddSpeciesModal };
}

export default connect(mapStateToProps, { toggleAddSpeciesModal })(AddSpeciesModal);
