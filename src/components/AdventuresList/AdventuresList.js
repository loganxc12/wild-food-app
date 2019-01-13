import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateAdventures} from "../../ducks/reducer";
import adventureMenu from "./menu-button.png";

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
                         // <Link to={`/adventure/${el.id}`} style={{textDecoration: "none"}}>
                              <div key={el.id} className="list-item">
                                   <div className="title">
                                        <p>06/27/2018</p>
                                        <h2>{el.title}</h2>
                                   </div>
                                   <img src={adventureMenu} />
                                   {/* <p>{el.date}</p>
                                   <p>{el.location}</p>
                                   <p>{el.description}</p> */}
                              </div> 
                         // </Link>
                    );
               } else { adventuresToDisplay = <h3>Looks like you haven't added any adventures yet.</h3> }
          } else { adventuresToDisplay = <h3>Loading...</h3> }
         
          return (
               <div className="list-wrapper">
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
