import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateAdventures} from "../../ducks/reducer";

class AdventuresList extends Component {
     constructor(props) {
          super(props);
          this.getAdventuresFromServer = this.getAdventuresFromServer.bind(this);
     }

     componentDidMount() {
          this.getAdventuresFromServer();
     }

     getAdventuresFromServer() {
          axios.get("/api/adventures").then(response => {
               console.log("getAdventuresFromServer", response);
               const { updateAdventures } = this.props;
               if (response.data.length) {
                    updateAdventures(response.data);
               }
          })
     }

     render() {
          const { adventures } = this.props;
          console.log(adventures);
          const adventuresToDisplay = adventures.length ?
               adventures.map(el => <h3 key={el.id}>{el.title}</h3>) 
               : <h3>Looks like you don't have any adventures yet</h3>
          return (
               <div className="adventures-list">
                    AdventuresList
                    <Link to="/adventure/add">
                         <button>ADD NEW ADVENTURE</button>
                    </Link>
                    { adventuresToDisplay }
               </div>
          );
     }
}

function mapStateToProps(reduxState) {
     const { adventures } = reduxState;
     return { adventures };
}

export default connect(mapStateToProps, { updateAdventures })(AdventuresList);