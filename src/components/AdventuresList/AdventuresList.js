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
               console.log(response);
               const { updateAdventures } = this.props;
               updateAdventures(response.data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
          })
     }

     render() {
          //Pulling down adventures array from Redux and mapping over/conditionally rendering.
          const { adventures } = this.props;
          let adventuresToDisplay;
          if (adventures !== null) {
               if (adventures.length) {
                    adventuresToDisplay = adventures.map(el => 
                         <div key={el.id}>
                              <h3>{el.title}</h3>
                              <p>{el.date}</p>
                              <p>{el.location}</p>
                              <p>{el.description}</p>
                         </div> 
                    );
               } else { adventuresToDisplay = <h3>Looks like you haven't added any adventures yet.</h3> }
          } else { adventuresToDisplay = <h3>Loading...</h3> }
         
          return (
               <div className="adventures-list">
                    <h2>Adventures List</h2>
                    <Link to="/adventure/add">
                         <button className="general-button">ADD NEW ADVENTURE</button>
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
