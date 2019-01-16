import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { updateAdventures} from "../../ducks/reducer";

class AdventuresList extends Component {

     render() {
          //Pulling down adventures array from Redux and mapping over/conditionally rendering.
          const { adventures } = this.props;

          let adventuresToDisplay;
          
          if (adventures !== null) {
               if (adventures.length) {
                    adventuresToDisplay = adventures.map(adventure => {
                         let adventureStyle = {
                              background: `linear-gradient(rgba(33, 41, 51, 0.65), rgba(8, 38, 75, 0.65)),url('${adventure.images[0]}')`,
                              backgroundSize: "cover",
                         }
                         return (
                              <div key={adventure.id} className="list-item-wrapper">
                                   <Link to={`/adventure/${adventure.id}`}>
                                        <div className="list-item" style={adventureStyle}>
                                             <div className="title">
                                                  <p>{moment(adventure.date).format("MM/DD/YYYY")}</p>
                                                  <h2>{adventure.title}</h2>
                                             </div>
                                        </div>
                                   </Link>
                              </div>
                         );
                    });
               } else { adventuresToDisplay = <h3>Looks like you haven't added any adventures yet.</h3> }
          } else { adventuresToDisplay = <h3>Loading...</h3> }
         
          return (
               <div className="list-wrapper">
                    { adventuresToDisplay }
                    <Link to="/adventure/add"><i className="fas fa-plus-circle"></i></Link>
               </div>
          );
     }
}

function mapStateToProps(reduxState) {
     const { adventures } = reduxState;
     return { adventures };
}

export default connect(mapStateToProps, { updateAdventures })(AdventuresList);
