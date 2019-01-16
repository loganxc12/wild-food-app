import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

class Adventure extends Component {

     constructor(props) {
          super(props);
          this.state = {
               adventure: "",
               species: []
          }
          this.getSingleAdventureFromServer = this.getSingleAdventureFromServer.bind(this);
     }

     componentDidMount() {
          const { id } = this.props.match.params;
          this.getSingleAdventureFromServer(id);
     }

     getSingleAdventureFromServer(id) {
          axios.get(`/api/adventures/${id}`).then(response => {
               console.log(response);
                    this.setState({
                         adventure: response.data.adventures[0],
                         species: response.data.species
                    })
          })
     }

     render() {
          const { adventure, species } = this.state;
          
          let adventureStyle = adventure ? {
               background: `linear-gradient(rgba(33, 41, 51, 0.65), rgba(8, 38, 75, 0.65)),url('${adventure.images[0]}')`,
               backgroundSize: "cover",
          } : null;

          const adventureToDisplay = adventure ? (
               <div className="adventure-wrapper">
                    <div className="adventure-hero" style={adventureStyle}>
                         <div className="adventure-title-wrapper">
                              <h1>{adventure.title.toUpperCase()}</h1>
                              <div className="adventure-details">
                                   <h3>{moment(adventure.date).format("MMMM Do YYYY")}</h3>
                                   <h3><i className="fas fa-map-marker-alt"></i> {adventure.location}</h3>
                              </div>
                              <div className="adventure-photos">
                                   <button>+ ADD PHOTOS</button>
                                   <h3><i className="fas fa-image"></i> SEE ALL PHOTOS</h3>
                              </div>
                         </div>
                    </div>
                    <div className="adventure-overview">
                         <div className="species-box">
                              <div className="species-box-content">
                                   <h2>SPECIES FOUND ON THIS ADVENTURE:</h2>
                                   <ul>
                                        { species.map(el => <li>{el.name.toUpperCase()} <i className="fas fa-long-arrow-alt-right"></i></li>) }
                                   </ul>
                              </div>
                         </div>
                         <div className="map-box">
                              <div className="map-preview"></div>
                         </div>
                    </div>
                    <div className="description-box">
                         <div className="description-box-content">
                              <h2>DESCRIPTION:</h2>
                              <p>{adventure.description}</p>                         
                         </div>
                    </div>
                    <div className="settings-box">
                         <div className="edit-delete-box">
                              <div className="edit">EDIT</div>
                              <div className="delete">DELETE</div>
                         </div>
                         <i className="fas fa-cog"></i>
                    </div>               
               </div>
          ) : null;

          return adventureToDisplay;
     }
     
}

export default Adventure;